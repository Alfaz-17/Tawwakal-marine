

const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'app', 'admin', 'products', '[id]', 'page.tsx');
let code = fs.readFileSync(targetFile, 'utf8');

const isCRLF = code.includes('\r\n');
if (isCRLF) {
  code = code.replace(/\r\n/g, '\n');
}

// 1. Update initial formData
const oldFormData = `  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    featured: false
  });`;

const newFormData = `  const [formData, setFormData] = useState({
    title: '',
    description: '',
    partNumber: '',
    modelNumber: '',
    brandName: '',
    coreCategory: '',
    category: '',
    condition: 'refurbished-tested',
    division: 'both',
    testingStatus: '100% Bench & I/O Tested with Video Verification',
    warranty: '12 Months Technical Warranty',
    originLocation: 'Bhavnagar / Alang Stock Hub',
    featured: false
  });
  const [selectedCoreFilter, setSelectedCoreFilter] = useState('All');`;

code = code.replace(oldFormData, newFormData);

// 2. Update setFormData on load
const oldSetOnLoad = `        setFormData({
          title: prod.title || '',
          description: prod.description || '',
          category: prod.category?._id || prod.category || '',
          featured: prod.featured || false
        });`;

const newSetOnLoad = `        setFormData({
          title: prod.title || '',
          description: prod.description || '',
          partNumber: prod.partNumber || '',
          modelNumber: prod.modelNumber || '',
          brandName: prod.brandName || prod.brand?.name || '',
          coreCategory: prod.coreCategory || prod.category?.coreCategory || '',
          category: prod.category?._id || prod.category || '',
          condition: prod.condition || 'refurbished-tested',
          division: prod.division || 'both',
          testingStatus: prod.testingStatus || '100% Bench & I/O Tested with Video Verification',
          warranty: prod.warranty || '12 Months Technical Warranty',
          originLocation: prod.originLocation || 'Bhavnagar / Alang Stock Hub',
          featured: prod.featured || false
        });
        if (prod.coreCategory || prod.category?.coreCategory) {
          setSelectedCoreFilter(prod.coreCategory || prod.category?.coreCategory);
        }`;

code = code.replace(oldSetOnLoad, newSetOnLoad);

// 3. Update Category JSX block
const oldCategoryJsx = `             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Category *</label>
                  <select
                    name="category"
                    className="w-full px-4 py-4 bg-muted/20 border border-border focus:border-accent outline-none text-xs font-bold tracking-widest uppercase"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
             </div>`;

const newCategoryJsx = `             {/* Part Number, Model & Brand */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Manufacturer Part #</label>
                  <input
                    name="partNumber"
                    placeholder="e.g. 6ES7315-2EH14-0AB0"
                    className="w-full px-4 py-4 bg-muted/20 border border-accent/40 focus:border-accent outline-none text-xs font-mono font-bold"
                    value={formData.partNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Model Series</label>
                  <input
                    name="modelNumber"
                    placeholder="e.g. CPU 315-2 DP"
                    className="w-full px-4 py-4 bg-muted/20 border border-border focus:border-accent outline-none text-xs"
                    value={formData.modelNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Brand</label>
                  <input
                    name="brandName"
                    placeholder="e.g. Siemens"
                    className="w-full px-4 py-4 bg-muted/20 border border-border focus:border-accent outline-none text-xs"
                    value={formData.brandName}
                    onChange={handleChange}
                  />
                </div>
             </div>

             {/* Core Category & Subcategory Filter Cascade */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Core Sector</label>
                  <select
                    className="w-full px-4 py-4 bg-muted/20 border border-border focus:border-accent outline-none text-xs font-bold uppercase"
                    value={selectedCoreFilter}
                    onChange={(e) => setSelectedCoreFilter(e.target.value)}
                  >
                    <option value="All">All Sectors ({categories.length} categories)</option>
                    <option value="Industrial Automation">Industrial Automation</option>
                    <option value="Marine Automation">Marine Automation</option>
                    <option value="Instrumentation & Sensors">Instrumentation &amp; Sensors</option>
                    <option value="Electrical & Switchgear">Electrical &amp; Switchgear</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Subcategory *</label>
                  <select
                    name="category"
                    className="w-full px-4 py-4 bg-muted/20 border border-border focus:border-accent outline-none text-xs font-bold uppercase"
                    value={formData.category}
                    onChange={(e) => {
                      const val = e.target.value;
                      const selectedCat = categories.find(c => c._id === val);
                      setFormData(prev => ({
                        ...prev,
                        category: val,
                        coreCategory: selectedCat?.coreCategory || prev.coreCategory
                      }));
                    }}
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {categories
                      .filter(cat => selectedCoreFilter === 'All' || cat.coreCategory === selectedCoreFilter)
                      .map(cat => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name} {cat.coreCategory ? \`[\${cat.coreCategory}]\` : ''}
                        </option>
                      ))}
                  </select>
                </div>
             </div>

             {/* Condition & Sector Division */}
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Hardware Condition</label>
                  <select
                    name="condition"
                    className="w-full px-4 py-4 bg-muted/20 border border-border focus:border-accent outline-none text-xs font-bold uppercase"
                    value={formData.condition}
                    onChange={handleChange}
                  >
                    <option value="refurbished-tested">100% Bench &amp; I/O Tested (Refurbished)</option>
                    <option value="brand-new-sealed">Brand New Factory Sealed</option>
                    <option value="new-open-box">New Surplus / Open Box</option>
                    <option value="used-tested">Pre-Owned Tested Working</option>
                    <option value="reconditioned">Fully Reconditioned</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Sector Division</label>
                  <select
                    name="division"
                    className="w-full px-4 py-4 bg-muted/20 border border-border focus:border-accent outline-none text-xs font-bold uppercase"
                    value={formData.division}
                    onChange={handleChange}
                  >
                    <option value="both">Both (Industrial &amp; Marine)</option>
                    <option value="industrial-automation">Industrial Automation Only</option>
                    <option value="marine-automation">Marine Automation Only</option>
                  </select>
                </div>
             </div>`;

code = code.replace(oldCategoryJsx, newCategoryJsx);

if (isCRLF) {
  code = code.replace(/\n/g, '\r\n');
}

fs.writeFileSync(targetFile, code);
console.log('Successfully updated app/admin/products/[id]/page.tsx');
