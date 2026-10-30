const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'app', 'admin', 'products', 'page.tsx');
let code = fs.readFileSync(targetFile, 'utf8');

const isCRLF = code.includes('\r\n');
if (isCRLF) {
  code = code.replace(/\r\n/g, '\n');
}

// 1. Enhance search filter to check partNumber, modelNumber, sku, brandName
const oldFilter = `  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.brand?.name && product.brand.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || product.category?._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });`;

const newFilter = `  const filteredProducts = products.filter((product: any) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm ||
                         product.title?.toLowerCase().includes(term) ||
                         product.partNumber?.toLowerCase().includes(term) ||
                         product.modelNumber?.toLowerCase().includes(term) ||
                         product.sku?.toLowerCase().includes(term) ||
                         product.brandName?.toLowerCase().includes(term) ||
                         (product.brand?.name && product.brand.name.toLowerCase().includes(term)) ||
                         product.description?.toLowerCase().includes(term);
    const matchesCategory = !selectedCategory || product.category?._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });`;

code = code.replace(oldFilter, newFilter);

// 2. Enhance product row rendering
const oldRow = `                        <div>
                           <h4 className="font-bold text-primary uppercase tracking-tight text-sm mb-1">{product.title}</h4>
                           <p className="text-[10px] text-muted-foreground line-clamp-1 italic">{product.description}</p>
                        </div>`;

const newRow = `                        <div className="space-y-1">
                           <div className="flex items-center gap-2 flex-wrap">
                             {product.brandName && (
                               <span className="text-[10px] font-extrabold uppercase text-[#008C95]">
                                 {product.brandName}
                               </span>
                             )}
                             {(product.partNumber || product.sku) && (
                               <span className="font-mono text-[10px] font-bold bg-[#F4F7FA] text-[#0B153B] px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                                 PN: {product.partNumber || product.sku}
                               </span>
                             )}
                             <span className="text-[9px] font-semibold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">
                               {product.condition === 'brand-new-sealed' ? 'Factory Sealed' : 'Bench Tested'}
                             </span>
                           </div>
                           <h4 className="font-bold text-primary tracking-tight text-xs sm:text-sm">{product.title}</h4>
                           <p className="text-[10px] text-muted-foreground line-clamp-1">{product.description}</p>
                        </div>`;

code = code.replace(oldRow, newRow);

if (isCRLF) {
  code = code.replace(/\n/g, '\r\n');
}

fs.writeFileSync(targetFile, code);
console.log('Successfully updated app/admin/products/page.tsx');

