const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env to get the active DB_URI
const envContent = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
const dbUriMatch = envContent.match(/DB_URI=(.+)/);

if (!dbUriMatch || !dbUriMatch[1]) {
  console.error("No DB_URI found in .env");
  process.exit(1);
}

const targetUri = dbUriMatch[1].trim();

// SAFETY CHECK: Ensure it targets ONLY the new Tawwakal Automation cluster!
if (!targetUri.includes('tawwakalautomation_db_user')) {
  console.error("SAFETY BLOCK: DB_URI does not point to tawwakalautomation_db_user! Halting.");
  process.exit(1);
}

console.log("Verified Safe Target: " + targetUri.replace(/:[^:]+@/, ':****@'));

// 1. Static Core Sectors
const CORE_CATEGORIES = [
  'Industrial Automation',
  'Marine Automation'
];

// 2. Dynamic Subcategories derived from public/categories/Industrial-automation and Marine-automation
const industrialSubcategories = [
  { name: 'PLC Systems & CPU Modules', slug: 'plc-systems', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 1, image: '/categories/plc-systems.png', desc: 'Programmable logic controllers, CPU racks, digital/analog I/O (Siemens Simatic, Allen-Bradley, Omron, Mitsubishi).' },
  { name: 'HMI Touch Panels & Displays', slug: 'hmi-panels', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 2, image: '/categories/hmi.png', desc: 'Industrial touch panels, display screens, and operator workstations (Pro-face, Siemens Comfort, Beijer).' },
  { name: 'VFD & Inverters', slug: 'vfd-inverters', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 3, image: '/categories/vfd.png', desc: 'Variable frequency motor drives, high-torque inverters, and speed controllers.' },
  { name: 'Industrial AC & DC Drives', slug: 'ac-dc-drives', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 4, image: '/categories/drives.png', desc: 'Heavy-duty modular drives, ABB ACS800 series, and Sinamics drive systems.' },
  { name: 'Servo Drives & Amplifiers', slug: 'servo-drives', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 5, image: '/categories/servo-drive.png', desc: 'Precision servo amplifiers and multi-axis motion controllers.' },
  { name: 'Servo Motors & Resolvers', slug: 'servo-motors', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 6, image: '/categories/servo-motor.png', desc: 'High-accuracy AC synchronous servo motors with optical feedback.' },
  { name: 'Controllers & Control Units', slug: 'controllers', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 7, image: '/categories/controller.png', desc: 'Process automation controllers, embedded controllers, and PID units.' },
  { name: 'I/O Modules & Expansion Racks', slug: 'io-modules', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 8, image: '/categories/i-o-modules.png', desc: 'Digital, analog, thermocouple, and communication expansion cards.' },
  { name: 'Circuit Breakers & Switchgear', slug: 'circuit-breakers', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 9, image: '/categories/circuit-breaker.png', desc: 'Molded case (MCCB), vacuum, and air circuit breakers (Siemens, ABB, Schneider).' },
  { name: 'Industrial Power Supplies', slug: 'power-supplies', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 10, image: '/categories/power-supply.png', desc: '24V DC DIN-rail power supplies, redundancy modules, and DC-DC converters.' },
  { name: 'Industrial Computers & IPCs', slug: 'industrial-computers', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 11, image: '/categories/computer.png', desc: 'Rugged rackmount PCs, embedded fanless boxes, and touch IPCs.' },
  { name: 'Contactors & Overload Relays', slug: 'contactors', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 12, image: '/categories/contactor.png', desc: 'Magnetic contactors, thermal overloads, and solid-state motor starters.' },
  { name: 'Cooling Fans & Thermal Units', slug: 'cooling-fans', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 13, image: '/categories/cooling-fan.png', desc: 'Cabinet cooling fans, filter fans, and heat exchangers for control panels.' },
  { name: 'Detectors & Proximity Sensors', slug: 'detectors', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 14, image: '/categories/detector.png', desc: 'Inductive, capacitive, photoelectric, and ultrasonic proximity detectors.' },
  { name: 'Fuses & High-Speed Protection', slug: 'fuses', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 15, image: '/categories/fuse.png', desc: 'Semiconductor protection fuses, NH blade fuses, and fuse bases.' },
  { name: 'Indicators & Digital Panel Meters', slug: 'indicators', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 16, image: '/categories/indicator.png', desc: 'Digital LED panel indicators, bargraph displays, and annunciator units.' },
  { name: 'Industrial Injectors', slug: 'injectors', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 17, image: '/categories/injector.png', desc: 'Precision fuel injectors, chemical injection valves, and fluid actuators.' },
  { name: 'Meters & Panel Instruments', slug: 'meters', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 18, image: '/categories/meter.png', desc: 'Multifunction power meters, ammeters, voltmeters, and frequency meters.' },
  { name: 'Potentiometers & Variable Resistors', slug: 'potentiometers', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 19, image: '/categories/potentiometers-variable-resistors.png', desc: 'Wirewound potentiometers, multiturn trimmers, and motorized rheostats.' },
  { name: 'Chart & Digital Data Recorders', slug: 'recorders', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 20, image: '/categories/recorder.png', desc: 'Paperless videographic recorders, paper strip chart recorders, and data loggers.' },
  { name: 'Rectifiers & Power Diode Bridges', slug: 'rectifiers', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 21, image: '/categories/rectifier.png', desc: 'Three-phase diode bridge rectifiers, thyristor modules, and DC exciters.' },
  { name: 'Scanners & Optical Readers', slug: 'scanners', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 22, image: '/categories/scanner.png', desc: 'Fixed mount 1D/2D industrial barcode scanners and vision inspection sensors.' },
  { name: 'Seal & Gasket Repair Kits', slug: 'seal-repair-kits', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 23, image: '/categories/seal-repair-kit.png', desc: 'Mechanical seal assemblies, hydraulic cylinder seal kits, and Viton gaskets.' },
  { name: 'Industrial Sensors & Pickups', slug: 'sensors', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 24, image: '/categories/sensors.png', desc: 'Magnetic pickup speed sensors, encoder sensors, and vibration transmitters.' },
  { name: 'Power Transistors & IGBT Modules', slug: 'transistors', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 25, image: '/categories/transistor.png', desc: 'High-power IGBT inverter modules, MOSFETs, and power Darlington blocks.' },
  { name: 'Adapters & Interface Modules', slug: 'adapters', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 26, image: '/categories/adapter.png', desc: 'Protocol converters, Profibus/Modbus gateways, and serial RS485 adapters.' },
  { name: 'Amplifiers & Signal Conditioners', slug: 'amplifiers', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 27, image: '/categories/amplifier.png', desc: 'Analog signal isolators, load cell amplifiers, and RTD signal converters.' },
  { name: 'Bulbs & Industrial Signal Lamps', slug: 'bulbs-lamps', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 28, image: '/categories/bulbs-lamps.png', desc: 'Tower stack warning lights, xenon strobes, and panel LED pilot lamps.' },
  { name: 'Cables & Heavy Duty Connectors', slug: 'cables-connectors', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 29, image: '/categories/cable-connector.png', desc: 'Harting industrial multi-pin connectors, shielded resolver and servo cables.' },
  { name: 'Capacitors & DC Link Banks', slug: 'capacitors', coreCategory: 'Industrial Automation', division: 'industrial-automation', displayOrder: 30, image: '/categories/capacitor.png', desc: 'DC bus smoothing capacitors, power factor correction, and snubber capacitors.' }
];

const marineSubcategories = [
  { name: 'Engine Room Controls & AMS', slug: 'engine-room-controls', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 31, image: '/categories/marine-automation.png', desc: 'Alarm and monitoring systems (AMS), generator power management, and telemetry.' },
  { name: 'Bridge Navigation & Telecom', slug: 'bridge-navigation', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 32, image: '/categories/navigation.png', desc: 'Marine communication, VHF/MF radios, AIS, GPS, and navigational transceivers.' },
  { name: 'Marine Radar Systems & Scanners', slug: 'marine-radar', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 33, image: '/categories/radar.png', desc: 'S-Band and X-Band radar scanners, display processors, and magnetrons.' },
  { name: 'Oil Mist Detectors (OMD)', slug: 'oil-mist-detectors', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 34, image: '/categories/oil-mist-detector.png', desc: 'Engine crankcase explosion prevention, Graviner, Daihatsu, and Schaller OMD units.' },
  { name: 'Pressure & Level Transmitters', slug: 'transmitters', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 35, image: '/categories/transmitter.png', desc: '4-20mA marine-approved hydrostatic level and gauge pressure transmitters.' },
  { name: 'Heat & Thermal Detectors', slug: 'heat-detectors', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 36, image: '/categories/heat-detector.png', desc: 'Engine and cargo thermal sensors, high-temperature heat detectors.' },
  { name: 'Marine Fire Alarm Systems & Panels', slug: 'marine-fire-alarms', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 37, image: '/categories/alarm.png', desc: 'Consilium, Salwico, and Tyco addressable marine fire & smoke detection systems.' },
  { name: 'Control Valves & Hydraulic Actuators', slug: 'control-valves', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 38, image: '/categories/control-valve.png', desc: 'Pneumatic, motorized, and hydraulic marine throttle and cooling valves.' },
  { name: 'Marine Solenoid Valves', slug: 'solenoid-valves', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 39, image: '/categories/solenoid-valve.png', desc: 'High-pressure directional air and fuel valves (Danfoss, ASCO, Rexroth).' },
  { name: 'Marine Joysticks & Deck Controllers', slug: 'marine-joysticks', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 40, image: '/categories/joystick.png', desc: 'Bridge wing propulsion joysticks, thruster controls, and crane levers.' },
  { name: 'Purifiers & Centrifugal Separators', slug: 'oil-separators', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 41, image: '/categories/separator.png', desc: 'Alfa Laval, Westfalia, and Mitsubishi fuel/lube oil separator spares.' },
  { name: 'Marine Pressure Gauges', slug: 'pressure-gauges', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 42, image: '/categories/pressure-gauge.png', desc: 'Glycerin-filled stainless steel bourdon tube marine pressure indicators.' },
  { name: 'Marine Pump Spares & Impellers', slug: 'pump-spares', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 43, image: '/categories/pump-spares.png', desc: 'Centrifugal pump bronze impellers, wear rings, and mechanical shaft seals.' },
  { name: 'HVAC & Refrigeration Spares', slug: 'hvac-refrigeration', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 44, image: '/categories/refrigeration-spares.png', desc: 'Marine provision cooling, Carrier/Sabroe compressor valve plates, expansion valves.' },
  { name: 'Industrial & Marine Heaters', slug: 'heaters', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 45, image: '/categories/heater.png', desc: 'Heavy fuel oil immersion heaters, flange heating bundles, and air duct heaters.' },
  { name: 'Marine Filters & Duplex Strainers', slug: 'marine-filters', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 46, image: '/categories/filter.png', desc: 'Boll & Kirch, Kanagawa duplex basket strainers, and wire mesh filter candles.' },
  { name: 'Marine Solenoid Coils & Ignition Units', slug: 'marine-coils', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 47, image: '/categories/coil.png', desc: 'Explosion-proof 24VDC/230VAC coils and auxiliary boiler ignition units.' },
  { name: 'Seals, O-Rings & Marine Gaskets', slug: 'seals-gaskets', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 48, image: '/categories/seals-o-rings-gasket.png', desc: 'Spiral wound metallic gaskets, plate heat exchanger EPDM gaskets.' },
  { name: 'Exhaust Thermometers & Sensors', slug: 'marine-thermometers', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 49, image: '/categories/thermometer.png', desc: 'V-line engine exhaust pyrometers, PT100 duplex temperature probes.' },
  { name: 'Marine Transistors & Electronic Modules', slug: 'marine-transistors', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 50, image: '/categories/transistor.png', desc: 'Shipboard power electronics, generator AVR modules, and thyristor banks.' },
  { name: 'Flame & Boiler Burner Scanners', slug: 'flame-scanners', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 51, image: '/categories/detector.png', desc: 'Aalborg, Saacke auxiliary boiler flame monitors, UV and IR sensors.' },
  { name: 'Governors & Marine Speed Actuators', slug: 'governors', coreCategory: 'Marine Automation', division: 'marine-automation', displayOrder: 52, image: '/categories/controller.png', desc: 'Woodward PGA, UG-8, and 2301A electronic governor controls and hydraulic actuators.' }
];

const allCategories = [...industrialSubcategories, ...marineSubcategories];

// 3. Brands
const brands = [
  { name: "Siemens", logo: "/brands/siemens.svg", description: "Global benchmark in industrial automation, Simatic PLCs, and Sinamics drives." },
  { name: "Allen-Bradley", logo: "/brands/allen-bradley.svg", description: "Rockwell Automation brand specializing in ControlLogix and GuardLogix PLCs." },
  { name: "ABB", logo: "/brands/abb.svg", description: "Pioneering technology leader in ACS drives, power grids, and marine automation." },
  { name: "Danfoss", logo: "/brands/danfoss.svg", description: "Industry standard for marine VLT frequency converters, pressure switches, and valves." },
  { name: "Schneider Electric", logo: "/brands/schneider.svg", description: "Modicon PLCs, Telemecanique switchgear, and energy management solutions." },
  { name: "Omron", logo: "/brands/omron.svg", description: "Industrial sensors, Sysmac automation platforms, and safety relays." },
  { name: "Mitsubishi Electric", logo: "/brands/mitsubishi.svg", description: "MELSEC series PLCs, GOT HMIs, and FR series inverters." },
  { name: "Beckhoff", logo: "/brands/beckhoff.svg", description: "PC-based automation, EtherCAT terminals, and embedded industrial PCs." },
  { name: "Woodward", logo: "/brands/woodward.svg", description: "World benchmark in marine electronic engine governors and turbine controllers." },
  { name: "Graviner", logo: "/brands/graviner.svg", description: "World benchmark in oil mist detection (Mark 5 & Mark 6) for two-stroke marine engines." },
  { name: "Furuno", logo: "/brands/furuno.svg", description: "Marine electronics, commercial radar, echo sounders, and satellite communication." },
  { name: "Consilium", logo: "/brands/consilium.svg", description: "Salwico marine fire detection systems, gas alarms, and navigational sensors." },
  { name: "Sperry Marine", logo: "/brands/sperry.svg", description: "VisionMaster radar, gyrocompasses, and integrated bridge systems." },
  { name: "Rosemount", logo: "/brands/rosemount.svg", description: "Emerson marine pressure, level, and temperature transmitters." },
  { name: "Alfa Laval", logo: "/brands/alfalaval.svg", description: "Centrifugal separators, plate heat exchangers, and marine fresh water generators." }
];

// 4. Products cleanly mapped to Subcategories
const products = [
  // --- Industrial Automation Products ---
  {
    title: "Siemens Simatic S7-300 CPU 315-2 PN/DP",
    slug: "siemens-simatic-s7-300-cpu-315-2-pn-dp",
    partNumber: "6ES7315-2EH14-0AB0",
    modelNumber: "CPU 315-2 PN/DP",
    categoryName: "PLC Systems & CPU Modules",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Siemens",
    condition: "refurbished-tested",
    testingStatus: "100% Bench & MPI/PROFINET Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 45000,
    availability: "in-stock",
    image: "/categories/plc-systems.png",
    featured: true,
    description: "Central processing unit with 384 KB work memory, 1x MPI/DP 12 Mbit/s interface, and 1x Ethernet PROFINET 2-port switch interface. Fully tested with test certificate."
  },
  {
    title: "Allen-Bradley ControlLogix 5580 Controller 3MB",
    slug: "allen-bradley-controllogix-5580-controller-3mb",
    partNumber: "1756-L83E",
    modelNumber: "ControlLogix 5580",
    categoryName: "PLC Systems & CPU Modules",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Allen-Bradley",
    condition: "refurbished-tested",
    testingStatus: "100% Dual Gigabit Ethernet Port Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 185000,
    availability: "in-stock",
    image: "/categories/plc-systems.png",
    featured: true,
    description: "Rockwell ControlLogix 5580 controller with 10MB user memory, 1Gb embedded Ethernet port, and support for up to 300 axes. Flawless Alang surplus condition."
  },
  {
    title: "Pro-face GP-4501TW 10.4-inch Touch Panel HMI",
    slug: "proface-gp-4501tw-10-4-touch-panel-hmi",
    partNumber: "PFXGP4501TADW",
    modelNumber: "GP-4501TW",
    categoryName: "HMI Touch Panels & Displays",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Schneider Electric",
    condition: "refurbished-tested",
    testingStatus: "Touch Digitizer & Backlight 100% Verified",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 38000,
    availability: "in-stock",
    image: "/categories/hmi.png",
    featured: true,
    description: "10.4-inch SVGA TFT color touch screen display, 65,536 colors, dual serial ports (RS-232C/RS-422/485) and Ethernet interface. Clean scratch-free glass."
  },
  {
    title: "Siemens Simatic Comfort Panel TP1200 12-inch",
    slug: "siemens-simatic-comfort-panel-tp1200-12-inch",
    partNumber: "6AV2124-0MC01-0AX0",
    modelNumber: "TP1200 Comfort",
    categoryName: "HMI Touch Panels & Displays",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Siemens",
    condition: "brand-new-sealed",
    testingStatus: "Factory Sealed in Original Box",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 95000,
    availability: "in-stock",
    image: "/categories/hmi.png",
    featured: true,
    description: "12-inch widescreen TFT display with 16 million colors, PROFINET interface, MPI/PROFIBUS DP interface, and 12 MB configuration memory. Sealed in original Siemens box."
  },
  {
    title: "Danfoss VLT AutomationDrive FC 302 37kW VFD Inverter",
    slug: "danfoss-vlt-automationdrive-fc-302-37kw-vfd-inverter",
    partNumber: "FC-302P37KT4E20H2",
    modelNumber: "VLT FC 302",
    categoryName: "VFD & Inverters",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Danfoss",
    condition: "refurbished-tested",
    testingStatus: "Load Tested under 380-480V 3-Phase",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 115000,
    availability: "in-stock",
    image: "/categories/vfd.png",
    featured: true,
    description: "Heavy duty 37 kW / 50 HP 3-phase AC frequency converter with graphical control panel (LCP), coated PCB for marine/industrial environments, and built-in brake chopper."
  },
  {
    title: "ABB ACS880 Industrial Drive Module 45kW",
    slug: "abb-acs880-industrial-drive-module-45kw",
    partNumber: "ACS880-01-096A-3",
    modelNumber: "ACS880-01",
    categoryName: "Industrial AC & DC Drives",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "ABB",
    condition: "refurbished-tested",
    testingStatus: "DTC Motor Control & Bus Capacitor Bank Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 140000,
    availability: "in-stock",
    image: "/categories/drives.png",
    featured: true,
    description: "Wall-mounted drive module with Direct Torque Control (DTC), IP21 enclosure rating, coated circuit boards, and integrated choke. Perfect for demanding pump and crane systems."
  },
  {
    title: "Siemens Sinamics S120 Double Motor Module",
    slug: "siemens-sinamics-s120-double-motor-module",
    partNumber: "6SL3120-2TE21-8AA3",
    modelNumber: "Sinamics S120",
    categoryName: "Servo Drives & Amplifiers",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Siemens",
    condition: "refurbished-tested",
    testingStatus: "DRIVE-CLiQ Feedback & Inverter Stage Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 85000,
    availability: "in-stock",
    image: "/categories/servo-drive.png",
    featured: false,
    description: "Booksize format double motor module, input 600V DC, output 400V 3AC 2x 18A, internal air cooling. Fully tested on test bench."
  },
  {
    title: "Yaskawa Sigma-7 AC Servomotor 1.5kW with Brake",
    slug: "yaskawa-sigma-7-ac-servomotor-1-5kw-brake",
    partNumber: "SGM7J-15AFA6C",
    modelNumber: "Sigma-7 SGM7J",
    categoryName: "Servo Motors & Resolvers",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Mitsubishi Electric",
    condition: "brand-new-sealed",
    testingStatus: "24-bit Absolute Encoder & Brake Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 48000,
    availability: "in-stock",
    image: "/categories/servo-motor.png",
    featured: false,
    description: "Medium inertia AC servo motor, 1.5 kW rated output, 3000 RPM, with holding brake and 24-bit absolute encoder. Ideal for high-precision motion control."
  },
  {
    title: "Siemens Simatic S7-1500 Compact CPU 1511C-1 PN",
    slug: "siemens-simatic-s7-1500-compact-cpu-1511c-1-pn",
    partNumber: "6ES7511-1CK01-0AB0",
    modelNumber: "CPU 1511C-1 PN",
    categoryName: "Controllers & Control Units",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Siemens",
    condition: "refurbished-tested",
    testingStatus: "Integrated I/O Channels 100% Bench Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 72000,
    availability: "in-stock",
    image: "/categories/controller.png",
    featured: false,
    description: "Compact CPU with 175 KB work memory for program and 1 MB for data, 16 digital inputs, 16 digital outputs, 5 analog inputs, and 2 analog outputs."
  },
  {
    title: "Siemens ET 200SP 16-Channel Digital Input Module",
    slug: "siemens-et-200sp-16-channel-digital-input-module",
    partNumber: "6ES7131-6BH00-0BA0",
    modelNumber: "DI 16x24VDC ST",
    categoryName: "I/O Modules & Expansion Racks",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Siemens",
    condition: "brand-new-sealed",
    testingStatus: "Factory Sealed with BaseUnit Compatibility",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 8500,
    availability: "in-stock",
    image: "/categories/i-o-modules.png",
    featured: false,
    description: "SIMATIC ET 200SP, Digital input module, DI 16x 24V DC Standard, suitable for BU type A0, Color code CC00, module diagnostics."
  },
  {
    title: "ABB SACE Tmax T4N 250A Molded Case Circuit Breaker",
    slug: "abb-sace-tmax-t4n-250a-mccb",
    partNumber: "1SDA054117R1",
    modelNumber: "Tmax T4N 250",
    categoryName: "Circuit Breakers & Switchgear",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "ABB",
    condition: "refurbished-tested",
    testingStatus: "Trip Unit Injection & Contact Resistance Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 28000,
    availability: "in-stock",
    image: "/categories/circuit-breaker.png",
    featured: false,
    description: "3-Pole 250A MCCB with PR221DS-LS/I electronic trip unit, 36kA breaking capacity at 415V AC. Ideal for main distribution switchboards."
  },
  {
    title: "Phoenix Contact Quint Power 24V DC 20A Power Supply",
    slug: "phoenix-contact-quint-power-24v-20a",
    partNumber: "QUINT4-PS/1AC/24DC/20",
    modelNumber: "QUINT4-PS",
    categoryName: "Industrial Power Supplies",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Schneider Electric",
    condition: "refurbished-tested",
    testingStatus: "Full Load & SFB Technology Voltage Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 14500,
    availability: "in-stock",
    image: "/categories/power-supply.png",
    featured: false,
    description: "Primary-switched power supply unit with selective fuse breaking (SFB) technology, NFC communication, dynamic boost up to 30A, and wide input range 100-240V AC."
  },
  {
    title: "Advantech 19-inch Industrial Rackmount PC Core i7",
    slug: "advantech-19-inch-industrial-rackmount-pc-core-i7",
    partNumber: "IPC-610-MB-I7",
    modelNumber: "IPC-610 MB",
    categoryName: "Industrial Computers & IPCs",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Beckhoff",
    condition: "refurbished-tested",
    testingStatus: "24-Hour Stress Test & Dual LAN Verified",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 68000,
    availability: "in-stock",
    image: "/categories/computer.png",
    featured: false,
    description: "4U 19-inch rackmount industrial computer, Intel Core i7 processor, 16GB DDR4 RAM, 512GB industrial SSD, redundant power supply, dual gigabit Ethernet."
  },
  {
    title: "Schneider Electric TeSys D Magnetic Contactor 3P 80A",
    slug: "schneider-electric-tesys-d-contactor-3p-80a",
    partNumber: "LC1D80M7",
    modelNumber: "TeSys D LC1D80",
    categoryName: "Contactors & Overload Relays",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Schneider Electric",
    condition: "brand-new-sealed",
    testingStatus: "Coil Impedance & Auxiliary Contacts Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 7200,
    availability: "in-stock",
    image: "/categories/contactor.png",
    featured: false,
    description: "3-Pole AC-3 contactor rated at 80A 37kW @ 400V, 220V AC 50/60Hz operating coil, with 1 NO + 1 NC auxiliary contacts. Genuine European surplus."
  },
  {
    title: "Rittal TopTherm Filter Fan Unit 230V 50/60Hz",
    slug: "rittal-toptherm-filter-fan-unit-230v",
    partNumber: "SK 3241.100",
    modelNumber: "TopTherm SK 3241",
    categoryName: "Cooling Fans & Thermal Units",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Siemens",
    condition: "brand-new-sealed",
    testingStatus: "Airflow CFM & Bearing Balance Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 6400,
    availability: "in-stock",
    image: "/categories/cooling-fan.png",
    featured: false,
    description: "Enclosure climate control filter fan, 225 m³/h airflow rate, 230V 50/60Hz, tool-less assembly and diagonal fan technology for uniform cabinet cooling."
  },
  {
    title: "Pepperl+Fuchs Inductive Proximity Sensor M18 PNP NO",
    slug: "pepperl-fuchs-inductive-proximity-sensor-m18-pnp",
    partNumber: "NBB5-18GM50-E2",
    modelNumber: "NBB5-18GM50",
    categoryName: "Detectors & Proximity Sensors",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Omron",
    condition: "brand-new-sealed",
    testingStatus: "Switching Frequency & Sensing Range Verified",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 2400,
    availability: "in-stock",
    image: "/categories/detector.png",
    featured: false,
    description: "M18 cylindrical flush mounted inductive proximity sensor, 5mm sensing range, 3-wire DC PNP normally open output, rugged nickel-plated brass housing."
  },
  {
    title: "Bussmann High-Speed Square Body Fuse 690V 500A",
    slug: "bussmann-high-speed-square-body-fuse-690v-500a",
    partNumber: "170M4014",
    modelNumber: "170M Series",
    categoryName: "Fuses & High-Speed Protection",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "ABB",
    condition: "brand-new-sealed",
    testingStatus: "Cold Resistance & Visual Indicator Verified",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 3600,
    availability: "in-stock",
    image: "/categories/fuse.png",
    featured: false,
    description: "Square body flush end fuse link, 500A rated current, 690V AC voltage rating, Class aR protection for variable speed drives and power converters."
  },
  {
    title: "Yokogawa Digital Panel Indicator Universal Input",
    slug: "yokogawa-digital-panel-indicator-universal-input",
    partNumber: "PR300-41000-00-0",
    modelNumber: "PR300 Power Meter",
    categoryName: "Indicators & Digital Panel Meters",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Omron",
    condition: "refurbished-tested",
    testingStatus: "Calibrated with 4-20mA Current Source",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 16000,
    availability: "in-stock",
    image: "/categories/indicator.png",
    featured: false,
    description: "High-precision digital indicator for universal process inputs (thermocouple, RTD, mA, mV, V), bright 5-digit LED display, RS-485 Modbus communication."
  },
  {
    title: "Woodward Precision Fuel Metering Injector Valve",
    slug: "woodward-precision-fuel-metering-injector-valve",
    partNumber: "8404-2051",
    modelNumber: "SonicFlo Valve",
    categoryName: "Industrial Injectors",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Woodward",
    condition: "reconditioned",
    testingStatus: "Pressure Leak Tested to 150 Bar",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 78000,
    availability: "in-stock",
    image: "/categories/injector.png",
    featured: false,
    description: "High-pressure fuel injection metering unit for industrial gas and dual-fuel diesel turbines, integrated position transducer, zero internal hysteresis."
  },
  {
    title: "Schneider PowerLogic PM8000 Power Quality Meter",
    slug: "schneider-powerlogic-pm8000-power-quality-meter",
    partNumber: "METSEPM8000",
    modelNumber: "PowerLogic PM8000",
    categoryName: "Meters & Panel Instruments",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Schneider Electric",
    condition: "refurbished-tested",
    testingStatus: "Class 0.2S Accuracy Calibrated",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 52000,
    availability: "in-stock",
    image: "/categories/meter.png",
    featured: false,
    description: "Precision power quality and revenue metering unit, EN 50160 compliance, waveform capture, harmonic analysis up to 63rd harmonic, dual Ethernet ports."
  },
  {
    title: "Vishay Spectrol 10-Turn Precision Potentiometer 10k",
    slug: "vishay-spectrol-10-turn-potentiometer-10k",
    partNumber: "534-1-1-103",
    modelNumber: "Model 534",
    categoryName: "Potentiometers & Variable Resistors",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Omron",
    condition: "brand-new-sealed",
    testingStatus: "Linearity & Contact Noise Bench Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 1800,
    availability: "in-stock",
    image: "/categories/potentiometers-variable-resistors.png",
    featured: false,
    description: "Multiturn wirewound industrial potentiometer, 10-turn 10k ohm resistance, 0.25% linearity, brass bushing and stainless steel shaft."
  },
  {
    title: "Yokogawa GX20 Paperless Chart Data Recorder",
    slug: "yokogawa-gx20-paperless-chart-data-recorder",
    partNumber: "GX20-1E/UH",
    modelNumber: "GX20 Touch",
    categoryName: "Chart & Digital Data Recorders",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Omron",
    condition: "refurbished-tested",
    testingStatus: "Multi-Channel Temperature & Voltage Calibrated",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 88000,
    availability: "in-stock",
    image: "/categories/recorder.png",
    featured: false,
    description: "Advanced paperless data recorder with 12.1-inch color multi-touch screen, modular I/O architecture supporting up to 100 channels, SD card logging, and Web server."
  },
  {
    title: "Semikron Three-Phase Bridge Rectifier Module 1600V",
    slug: "semikron-three-phase-bridge-rectifier-1600v",
    partNumber: "SKD 100/16",
    modelNumber: "SKD 100",
    categoryName: "Rectifiers & Power Diode Bridges",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "ABB",
    condition: "brand-new-sealed",
    testingStatus: "Forward Voltage & Blocking Isolation Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 4200,
    availability: "in-stock",
    image: "/categories/rectifier.png",
    featured: false,
    description: "Power bridge rectifier module for 3-phase AC to DC rectification, 100A continuous forward current, 1600V repetitive peak reverse voltage."
  },
  {
    title: "Cognex DataMan 262 Fixed-Mount Barcode Scanner",
    slug: "cognex-dataman-262-fixed-mount-barcode-scanner",
    partNumber: "DMR-262X-0120",
    modelNumber: "DataMan 262",
    categoryName: "Scanners & Optical Readers",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Omron",
    condition: "refurbished-tested",
    testingStatus: "Liquid Lens & 2D DPM Decoding Bench Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 46000,
    availability: "in-stock",
    image: "/categories/scanner.png",
    featured: false,
    description: "High-performance image-based barcode reader with high-speed liquid lens technology, modular lighting, reads challenging 1D, 2D, and direct part marks (DPM)."
  },
  {
    title: "Flowserve Durametallic Mechanical Cartridge Seal Kit 55mm",
    slug: "flowserve-durametallic-mechanical-cartridge-seal-55mm",
    partNumber: "ISC2-55MM-SEAL",
    modelNumber: "ISC2 Series",
    categoryName: "Seal & Gasket Repair Kits",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Alfa Laval",
    condition: "brand-new-sealed",
    testingStatus: "Silicon Carbide Faces & O-Rings Inspected",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 24000,
    availability: "in-stock",
    image: "/categories/seal-repair-kit.png",
    featured: false,
    description: "Standard cartridge mechanical seal assembly for industrial pumps, silicon carbide faces, Hastelloy springs, and Viton elastomers for aggressive media."
  },
  {
    title: "IFM Electronic Magnetic Speed & RPM Pickup Sensor",
    slug: "ifm-electronic-magnetic-speed-rpm-pickup-sensor",
    partNumber: "IG6084",
    modelNumber: "IGA3005-BPKG",
    categoryName: "Industrial Sensors & Pickups",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Omron",
    condition: "brand-new-sealed",
    testingStatus: "High-Frequency Magnetic Pulse Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 3200,
    availability: "in-stock",
    image: "/categories/sensors.png",
    featured: false,
    description: "Inductive rotation speed sensor, M18 threaded housing, sensing distance 5mm, PNP normally open, frequency range up to 2000 pulses/second."
  },
  {
    title: "Mitsubishi Electric Dual IGBT Module 1200V 300A",
    slug: "mitsubishi-electric-dual-igbt-module-1200v-300a",
    partNumber: "CM300DX-24T",
    modelNumber: "6th Gen IGBT",
    categoryName: "Power Transistors & IGBT Modules",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Mitsubishi Electric",
    condition: "brand-new-sealed",
    testingStatus: "Gate Threshold & Vce Saturation Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 11000,
    availability: "in-stock",
    image: "/categories/transistor.png",
    featured: false,
    description: "Dual IGBT module for high power motor drives and inverters, 1200V collector-emitter voltage, 300A collector current, low loss CSTBT chip technology."
  },
  {
    title: "Moxa NPort 5150 1-Port RS-232/422/485 Serial Device Server",
    slug: "moxa-nport-5150-serial-device-server",
    partNumber: "NPort-5150",
    modelNumber: "NPort 5100 Series",
    categoryName: "Adapters & Interface Modules",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Siemens",
    condition: "refurbished-tested",
    testingStatus: "Serial Loopback & Ethernet Ping Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 9200,
    availability: "in-stock",
    image: "/categories/adapter.png",
    featured: false,
    description: "1-port RS-232/422/485 serial device server, 10/100M Ethernet port, compact metal housing with DIN-rail mounting, 15 kV ESD protection for all serial signals."
  },
  {
    title: "PR Electronics 4116 Universal Transmitter & Signal Conditioner",
    slug: "pr-electronics-4116-universal-transmitter",
    partNumber: "4116-U",
    modelNumber: "PR 4116",
    categoryName: "Amplifiers & Signal Conditioners",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Danfoss",
    condition: "brand-new-sealed",
    testingStatus: "Galvanic 2.3 kVAC Isolation Verified",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 12500,
    availability: "in-stock",
    image: "/categories/amplifier.png",
    featured: false,
    description: "Universal signal conditioner for RTD, TC, Ohm, potentiometer, mA, and V inputs, universal supply 21.6-253VAC / 19.2-300VDC, front detachable display 4501."
  },
  {
    title: "Patlite 3-Tier Modular LED Signal Tower Light 24V",
    slug: "patlite-3-tier-modular-led-signal-tower-light-24v",
    partNumber: "LME-302L-RYG",
    modelNumber: "LME Series",
    categoryName: "Bulbs & Industrial Signal Lamps",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Omron",
    condition: "brand-new-sealed",
    testingStatus: "LED Intensity & Audible Buzzer Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 4800,
    availability: "in-stock",
    image: "/categories/bulbs-lamps.png",
    featured: false,
    description: "60mm diameter 3-tier LED signal tower (Red, Yellow, Green), 24V AC/DC, continuous and flashing light with integrated 85dB alarm buzzer."
  },
  {
    title: "Harting Han 24B Heavy-Duty Industrial Connector Hood & Insert",
    slug: "harting-han-24b-heavy-duty-connector",
    partNumber: "19-30-024-1251",
    modelNumber: "Han 24B",
    categoryName: "Cables & Heavy Duty Connectors",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "Siemens",
    condition: "brand-new-sealed",
    testingStatus: "Gold Plated Contact Retention Verified",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 3400,
    availability: "in-stock",
    image: "/categories/cable-connector.png",
    featured: false,
    description: "Complete Han 24B bulkhead housing, side entry hood with double locking levers, 24-pole plus ground screw-terminal insert, IP65 protection."
  },
  {
    title: "Epcos TDK High-Voltage DC Link Film Capacitor 1100V",
    slug: "epcos-tdk-high-voltage-dc-link-capacitor-1100v",
    partNumber: "B25673A0102K000",
    modelNumber: "MKK Series",
    categoryName: "Capacitors & DC Link Banks",
    coreCategory: "Industrial Automation",
    division: "industrial-automation",
    brandName: "ABB",
    condition: "brand-new-sealed",
    testingStatus: "Capacitance & Dielectric Loss Angle Measured",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 5200,
    availability: "in-stock",
    image: "/categories/capacitor.png",
    featured: false,
    description: "Metallized polypropylene film capacitor for DC link filtering in wind/solar inverters and high-power VFD drives, 1100V DC rated, self-healing technology."
  },

  // --- Marine Automation Products ---
  {
    title: "Graviner Mark 6 Oil Mist Detector Main Control Unit",
    slug: "graviner-mark-6-oil-mist-detector-main-control-unit",
    partNumber: "53830-511",
    modelNumber: "Mark 6 MCU",
    categoryName: "Oil Mist Detectors (OMD)",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Graviner",
    condition: "refurbished-tested",
    testingStatus: "10-Channel Optical Calibration Certified",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 195000,
    availability: "in-stock",
    image: "/categories/oil-mist-detector.png",
    featured: true,
    description: "Complete OMD control unit for large 2-stroke and 4-stroke marine diesel engines. Measures oil mist density across up to 10 crankcase sampling points. Certified Alang salvage."
  },
  {
    title: "Schaller Automation Visatron VN215/87 Plus OMD",
    slug: "schaller-automation-visatron-vn215-87-plus-omd",
    partNumber: "VN215-87PLUS",
    modelNumber: "Visatron VN215",
    categoryName: "Oil Mist Detectors (OMD)",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Graviner",
    condition: "refurbished-tested",
    testingStatus: "Optical Scavenge & Air Jet Venturi Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 165000,
    availability: "in-stock",
    image: "/categories/oil-mist-detector.png",
    featured: true,
    description: "Compact oil mist detector for high-speed and medium-speed marine diesel engines. Optical measuring head with integrated micro-processor and alarm contacts."
  },
  {
    title: "Furuno FAR-2117 X-Band Marine Radar Scanner Unit",
    slug: "furuno-far-2117-x-band-marine-radar-scanner",
    partNumber: "FAR-2117-BB",
    modelNumber: "FAR-2117",
    categoryName: "Marine Radar Systems & Scanners",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Furuno",
    condition: "refurbished-tested",
    testingStatus: "Magnetron Power Output & Gearbox Bench Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 245000,
    availability: "in-stock",
    image: "/categories/radar.png",
    featured: true,
    description: "12 kW X-Band marine radar with 4-foot open array scanner, black box processor unit, ARPA target tracking, and IMO approval for commercial vessels."
  },
  {
    title: "Sperry Marine VisionMaster FT 250 S-Band Radar Transceiver",
    slug: "sperry-marine-visionmaster-ft-250-s-band-radar",
    partNumber: "65901AC",
    modelNumber: "VisionMaster FT 250",
    categoryName: "Marine Radar Systems & Scanners",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Sperry Marine",
    condition: "refurbished-tested",
    testingStatus: "30kW S-Band Magnetron Pulse & Waveguide Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 320000,
    availability: "in-stock",
    image: "/categories/radar.png",
    featured: true,
    description: "Heavy-duty 30 kW S-Band radar transceiver for deep-sea ocean navigation, high penetration in heavy rain and fog, advanced clutter suppression."
  },
  {
    title: "Sailor 6222 VHF DSC Marine Class A Transceiver",
    slug: "sailor-6222-vhf-dsc-marine-class-a-transceiver",
    partNumber: "406222A-00500",
    modelNumber: "Sailor 6222",
    categoryName: "Bridge Navigation & Telecom",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Furuno",
    condition: "refurbished-tested",
    testingStatus: "DSC Distress & RF Output 25W RF Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 68000,
    availability: "in-stock",
    image: "/categories/navigation.png",
    featured: false,
    description: "GMDSS Class A VHF radio with 3.2-inch TFT display, dual watch, tri-watch, scanning, high performance replay function, and waterproof handset."
  },
  {
    title: "Danfoss MBS 3100 Compact Marine Pressure Transmitter",
    slug: "danfoss-mbs-3100-compact-marine-pressure-transmitter",
    partNumber: "060G1460",
    modelNumber: "MBS 3100",
    categoryName: "Pressure & Level Transmitters",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Danfoss",
    condition: "brand-new-sealed",
    testingStatus: "0-10 Bar Calibrated & Marine Class Approved",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 13500,
    availability: "in-stock",
    image: "/categories/transmitter.png",
    featured: false,
    description: "Block-type marine pressure transmitter, 4-20mA 2-wire output, pressure range 0 to 10 bar relative, G 1/4 female connection, DNV and Lloyd's Register type approved."
  },
  {
    title: "Rosemount 3051S Marine Hydrostatic Level Transmitter",
    slug: "rosemount-3051s-marine-hydrostatic-level-transmitter",
    partNumber: "3051S2CD2A2E11A1A",
    modelNumber: "3051S Series",
    categoryName: "Pressure & Level Transmitters",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Rosemount",
    condition: "refurbished-tested",
    testingStatus: "HART Protocol & Hydrostatic Pressure Calibrated",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 42000,
    availability: "in-stock",
    image: "/categories/transmitter.png",
    featured: false,
    description: "Scalable coplanar pressure transmitter with SuperModule platform, 4-20 mA HART output, Hastelloy C-276 diaphragm, marine certified for ballast/fuel tanks."
  },
  {
    title: "Kongsberg K-Chief 600 Marine Alarm & Monitoring Station",
    slug: "kongsberg-k-chief-600-marine-alarm-monitoring-station",
    partNumber: "KC-600-OPU",
    modelNumber: "K-Chief 600",
    categoryName: "Engine Room Controls & AMS",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "ABB",
    condition: "refurbished-tested",
    testingStatus: "CAN-Bus & Dual Ethernet Communication Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 210000,
    availability: "in-stock",
    image: "/categories/marine-automation.png",
    featured: true,
    description: "Marine operator station panel for alarm, monitoring, and generator power management systems. Marine grade touch screen with dual power inputs."
  },
  {
    title: "Consilium Salwico NS-AOHS Marine Smoke & Heat Detector",
    slug: "consilium-salwico-ns-aohs-marine-smoke-heat-detector",
    partNumber: "5200021-00A",
    modelNumber: "NS-AOHS",
    categoryName: "Heat & Thermal Detectors",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Consilium",
    condition: "brand-new-sealed",
    testingStatus: "Optical Smoke Chamber & Thermistor Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 4800,
    availability: "in-stock",
    image: "/categories/heat-detector.png",
    featured: false,
    description: "Addressable optical smoke and heat multi-criteria detector for cargo holds and engine rooms. Certified for marine installations under MED (Marine Equipment Directive)."
  },
  {
    title: "Consilium Salwico CS4000 Marine Fire Alarm Central Panel",
    slug: "consilium-salwico-cs4000-marine-fire-alarm-panel",
    partNumber: "5100160-00A",
    modelNumber: "CS4000 Panel",
    categoryName: "Marine Fire Alarm Systems & Panels",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Consilium",
    condition: "refurbished-tested",
    testingStatus: "Full Loop Simulation & Relay Outputs Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 135000,
    availability: "in-stock",
    image: "/categories/alarm.png",
    featured: false,
    description: "State-of-the-art addressable marine fire detection control panel supporting up to 16 detection loops, backlit graphical LCD, and dual 24V DC battery backup controller."
  },
  {
    title: "Samson Type 3241 Pneumatic Marine Control Valve DN50 PN40",
    slug: "samson-type-3241-pneumatic-control-valve-dn50",
    partNumber: "SAM-3241-DN50",
    modelNumber: "Type 3241 Globe",
    categoryName: "Control Valves & Hydraulic Actuators",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Danfoss",
    condition: "reconditioned",
    testingStatus: "Hydrostatic Seat Leakage Tested to 60 Bar",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 48000,
    availability: "in-stock",
    image: "/categories/control-valve.png",
    featured: false,
    description: "DN50 PN40 cast steel globe control valve equipped with Type 3277 pneumatic diaphragm actuator and digital electropneumatic positioner 3730."
  },
  {
    title: "Danfoss EV220B 2/2-Way Marine High Pressure Solenoid Valve",
    slug: "danfoss-ev220b-marine-solenoid-valve",
    partNumber: "032U7120",
    modelNumber: "EV220B 15B",
    categoryName: "Marine Solenoid Valves",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Danfoss",
    condition: "brand-new-sealed",
    testingStatus: "Pressure Holding & Coiling Actuation Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 6800,
    availability: "in-stock",
    image: "/categories/solenoid-valve.png",
    featured: false,
    description: "Servo-operated 2/2-way brass solenoid valve, G 1/2 connection, differential pressure range 0.3 to 16 bar, EPDM seal material for steam, freshwater, and cooling circuits."
  },
  {
    title: "Lilaas Marine Dual Bow Thruster Joystick Controller",
    slug: "lilaas-marine-dual-bow-thruster-joystick",
    partNumber: "LO1-2-120",
    modelNumber: "Lilaas LO1",
    categoryName: "Marine Joysticks & Deck Controllers",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Woodward",
    condition: "refurbished-tested",
    testingStatus: "Potentiometer Tracking & Center Detent Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 36000,
    availability: "in-stock",
    image: "/categories/joystick.png",
    featured: false,
    description: "Precision marine-grade deck joystick controller with illuminated pointer dial, dual axis spring return, and IP66 marine weather sealing."
  },
  {
    title: "Alfa Laval S-Type Centrifugal Fuel Oil Purifier Bowl Assembly",
    slug: "alfa-laval-s-type-centrifugal-fuel-purifier-bowl",
    partNumber: "S-821-BOWL",
    modelNumber: "S-821 Separator",
    categoryName: "Purifiers & Centrifugal Separators",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Alfa Laval",
    condition: "reconditioned",
    testingStatus: "Dynamic Balancing & Spindle Runout Certified",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 275000,
    availability: "in-stock",
    image: "/categories/separator.png",
    featured: true,
    description: "Complete centrifugal separator bowl assembly with disc stack, sliding bowl bottom, operating water mechanism, dynamically balanced to ISO 1940 G2.5."
  },
  {
    title: "Wika Marine Glycerin-Filled Stainless Pressure Gauge 0-25 Bar",
    slug: "wika-marine-glycerin-filled-pressure-gauge-0-25-bar",
    partNumber: "233.50.100",
    modelNumber: "Model 233.50",
    categoryName: "Marine Pressure Gauges",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Danfoss",
    condition: "brand-new-sealed",
    testingStatus: "Deadweight Tester Class 1.0 Calibrated",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 3800,
    availability: "in-stock",
    image: "/categories/pressure-gauge.png",
    featured: false,
    description: "100mm dial size all-stainless steel pressure gauge, liquid filled for extreme marine vibration damping, 1/2-inch NPT bottom connection, 0 to 25 bar range."
  },
  {
    title: "Desmi Marine Centrifugal Pump Replacement Impeller Bronze",
    slug: "desmi-marine-centrifugal-pump-impeller-bronze",
    partNumber: "DESMI-NSL-100-215",
    modelNumber: "NSL 100/215",
    categoryName: "Marine Pump Spares & Impellers",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Alfa Laval",
    condition: "brand-new-sealed",
    testingStatus: "Machined & Hydraulically Balanced",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 32000,
    availability: "in-stock",
    image: "/categories/pump-spares.png",
    featured: false,
    description: "Gunmetal/marine bronze closed impeller for Desmi NSL centrifugal seawater cooling pumps, 215mm outer diameter with keyway hub."
  },
  {
    title: "Carrier Marine 06D Refrigeration Compressor Valve Plate Kit",
    slug: "carrier-marine-06d-refrigeration-compressor-valve-plate",
    partNumber: "06DA660064",
    modelNumber: "Carlyle 06D",
    categoryName: "HVAC & Refrigeration Spares",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Danfoss",
    condition: "brand-new-sealed",
    testingStatus: "Suction & Discharge Reed Valves Inspected",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 11500,
    availability: "in-stock",
    image: "/categories/refrigeration-spares.png",
    featured: false,
    description: "High-lift cylinder head valve plate rebuild kit with gaskets and reeds for Carlyle/Carrier 06D marine provision cooling compressors."
  },
  {
    title: "Chromalox Marine Electric Immersion Fuel Oil Pre-Heater 18kW",
    slug: "chromalox-marine-electric-immersion-heater-18kw",
    partNumber: "MTO-1830",
    modelNumber: "MTO Heavy Oil",
    categoryName: "Industrial & Marine Heaters",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Danfoss",
    condition: "refurbished-tested",
    testingStatus: "Megger Insulation Resistance & Wattage Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 34000,
    availability: "in-stock",
    image: "/categories/heater.png",
    featured: false,
    description: "Flanged electric immersion heater bundle for heavy fuel oil purifiers and booster units, 18 kW 440V 3-Phase, low watt-density Incoloy heating elements."
  },
  {
    title: "Boll & Kirch Duplex Automatic Filter Wire Mesh Candles",
    slug: "boll-kirch-duplex-automatic-filter-candles",
    partNumber: "BOLL-2-05-5-DN80",
    modelNumber: "BollFilter 2.05.5",
    categoryName: "Marine Filters & Duplex Strainers",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Alfa Laval",
    condition: "brand-new-sealed",
    testingStatus: "Stainless Wire Mesh Micron Integrity Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 14000,
    availability: "in-stock",
    image: "/categories/filter.png",
    featured: false,
    description: "Set of cleanable stainless steel star pleated wire mesh filter candles for Boll & Kirch automatic backflushing lube oil filters, 34-micron absolute rating."
  },
  {
    title: "Danfoss 24V DC 10W Marine Solenoid Valve Coil",
    slug: "danfoss-24v-dc-10w-marine-solenoid-coil",
    partNumber: "018F6707",
    modelNumber: "Type BB Coil",
    categoryName: "Marine Solenoid Coils & Ignition Units",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Danfoss",
    condition: "brand-new-sealed",
    testingStatus: "Coil Resistance & IP67 Seal Verified",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 2600,
    availability: "in-stock",
    image: "/categories/coil.png",
    featured: false,
    description: "Snap-on 24V DC 10 Watt solenoid coil with DIN 43650 terminal plug, class H insulation, temperature rating up to 105C for engine room environments."
  },
  {
    title: "Sulzer Marine Mechanical Pump Seal & Viton O-Ring Rebuild Kit",
    slug: "sulzer-marine-mechanical-pump-seal-kit",
    partNumber: "SULZER-AHL-SEAL-KIT",
    modelNumber: "Sulzer AHLSTAR",
    categoryName: "Seals, O-Rings & Marine Gaskets",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Alfa Laval",
    condition: "brand-new-sealed",
    testingStatus: "Carbon/Silicon Carbide Lapping Checked",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 18500,
    availability: "in-stock",
    image: "/categories/seals-o-rings-gasket.png",
    featured: false,
    description: "Complete cartridge replacement seal for Sulzer Ahlstar marine centrifugal pumps, balanced rotary face, Viton secondary elastomers, stainless 316 hardware."
  },
  {
    title: "Sika Marine Diesel Engine Exhaust Gas V-Line Thermometer",
    slug: "sika-marine-exhaust-gas-v-line-thermometer",
    partNumber: "SIKA-174B-600",
    modelNumber: "Type 174 B",
    categoryName: "Exhaust Thermometers & Sensors",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Danfoss",
    condition: "brand-new-sealed",
    testingStatus: "600°C Heat Chamber Accuracy Verified",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 5400,
    availability: "in-stock",
    image: "/categories/thermometer.png",
    featured: false,
    description: "V-shaped industrial marine thermometer, range 0 to 600°C, immersion stem length 160mm with G 1/2 male thread, aluminum gold-anodized case."
  },
  {
    title: "Woodward 2301A Electronic Marine Speed & Load Sharing Governor",
    slug: "woodward-2301a-electronic-marine-speed-governor",
    partNumber: "9905-031",
    modelNumber: "2301A High Voltage",
    categoryName: "Governors & Marine Speed Actuators",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Woodward",
    condition: "refurbished-tested",
    testingStatus: "Droop/Isochronous & Paralleling Generator Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 64000,
    availability: "in-stock",
    image: "/categories/controller.png",
    featured: false,
    description: "Speed control and load sharing unit for marine generator sets and auxiliary engines, 90-150V DC / 88-132V AC input, compatible with Woodward hydraulic actuators."
  },
  {
    title: "Honeywell C7027A1049 Minipeeper UV Flame Sensor",
    slug: "honeywell-c7027a1049-minipeeper-uv-flame-sensor",
    partNumber: "C7027A1049",
    modelNumber: "Minipeeper C7027A",
    categoryName: "Flame & Boiler Burner Scanners",
    coreCategory: "Marine Automation",
    division: "marine-automation",
    brandName: "Danfoss",
    condition: "brand-new-sealed",
    testingStatus: "Ultraviolet Sensitivity & Response Time Tested",
    warranty: "12 Months Technical Replacement Warranty",
    originLocation: "Alang Ship Breaking Yard Stock Hub / Bhavnagar",
    price: 8800,
    availability: "in-stock",
    image: "/categories/detector.png",
    featured: false,
    description: "Compact ultraviolet flame detector for monitoring gas, oil, or combination fuel marine boiler burners. NPT 1/2-inch mount with 1.8m lead wires."
  }
];

const blogs = [
  {
    title: "Sourcing Marine & Industrial Automation from Alang: Technical Quality & Testing Guide",
    slug: "sourcing-marine-automation-alang-guide",
    excerpt: "How Alang Ship Breaking Yard supplies world-class Siemens, Danfoss, and Graviner automation systems with comprehensive bench testing.",
    content: "Alang Ship Breaking Yard in Gujarat, India represents the single largest aggregation hub of industrial and marine automation spares in the world. As ocean vessels reach their decommissioning lifecycle, critical engine room controls, PLCs, frequency drives, and navigation systems are carefully de-installed by certified marine engineers.\n\nEvery PLC rack, HMI panel, and variable frequency drive undergoes rigorous bench testing, insulation checking, and firmware verification before entering stock inventory. This provides industrial plants and ship management operators access to genuine, obsolescence-proof automation hardware with immediate delivery availability.",
    image: "/categories/plc-systems.png"
  },
  {
    title: "Oil Mist Detector (OMD) Preventive Maintenance & SOLAS Regulation Compliance",
    slug: "oil-mist-detector-preventive-maintenance-solas",
    excerpt: "Essential guidelines for Graviner Mark 6 and Schaller Visatron OMD calibration and sensor cleanliness on deep-sea vessels.",
    content: "Under SOLAS Chapter II-1, Regulation 47, every marine diesel engine with a cylinder bore of 300mm or more must be fitted with an approved oil mist detection system or engine bearing temperature monitor to prevent catastrophic crankcase explosions.\n\nRegular lens cleaning, optical scavenge airflow verification, and zero-point recalibration ensure that high oil mist conditions are detected within milliseconds, triggering immediate automated engine slowdown.",
    image: "/categories/oil-mist-detector.png"
  }
];

async function runSeed() {
  try {
    console.log("Connecting to Tawwakal Automation MongoDB...");
    await mongoose.connect(targetUri);
    console.log("Connected to database: " + mongoose.connection.db.databaseName);

    // Dynamic Schema definitions
    const CategorySchema = new mongoose.Schema({
      name: String,
      slug: String,
      coreCategory: String,
      division: String,
      displayOrder: Number,
      description: String,
      image: String
    }, { timestamps: true });

    const BrandSchema = new mongoose.Schema({
      name: String,
      logo: String,
      description: String
    }, { timestamps: true });

    const ProductSchema = new mongoose.Schema({
      title: String,
      slug: String,
      partNumber: String,
      modelNumber: String,
      description: String,
      category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
      coreCategory: String,
      division: String,
      brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
      brandName: String,
      condition: String,
      testingStatus: String,
      warranty: String,
      originLocation: String,
      availability: String,
      price: Number,
      image: String,
      featured: Boolean
    }, { timestamps: true });

    const BlogSchema = new mongoose.Schema({
      title: String,
      slug: String,
      excerpt: String,
      content: String,
      image: String,
      date: { type: Date, default: Date.now }
    }, { timestamps: true });

    const SettingsSchema = new mongoose.Schema({
      autoBackgroundRemoval: Boolean,
      applyWatermark: Boolean,
      watermarkText: String,
      geminiModel: String
    }, { timestamps: true });

    const UserSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String
    }, { timestamps: true });

    const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
    const Brand = mongoose.models.Brand || mongoose.model('Brand', BrandSchema);
    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
    const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
    const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    console.log("\n[1/5] Clearing outdated & scattered data in Tawwakal database...");
    await Promise.all([
      Category.deleteMany({}),
      Brand.deleteMany({}),
      Product.deleteMany({}),
      Blog.deleteMany({}),
      Settings.deleteMany({})
    ]);
    console.log(" - Clean slate established.");

    console.log(`\n[2/5] Seeding ${allCategories.length} Subcategories (${industrialSubcategories.length} Industrial, ${marineSubcategories.length} Marine)...`);
    const createdCats = await Category.insertMany(allCategories);
    const catMap = createdCats.reduce((acc, c) => ({ ...acc, [c.name]: c._id }), {});
    console.log(` - Successfully seeded ${createdCats.length} dynamic subcategories.`);

    console.log(`\n[3/5] Seeding ${brands.length} Top Automation & Marine Brands...`);
    const createdBrands = await Brand.insertMany(brands);
    const brandMap = createdBrands.reduce((acc, b) => ({ ...acc, [b.name]: b._id }), {});
    console.log(` - Successfully seeded ${createdBrands.length} brands.`);

    console.log(`\n[4/5] Seeding ${products.length} Products with real Part Numbers, Models & Category Links...`);
    const productsWithRefs = products.map(p => ({
      ...p,
      category: catMap[p.categoryName],
      brand: brandMap[p.brandName]
    }));
    const createdProducts = await Product.insertMany(productsWithRefs);
    console.log(` - Successfully seeded ${createdProducts.length} verified products.`);

    console.log("\n[5/5] Seeding Blogs, Settings & Admin Users...");
    await Blog.insertMany(blogs);
    await Settings.create({
      autoBackgroundRemoval: false,
      applyWatermark: true,
      watermarkText: 'Tawwakal Automation',
      geminiModel: 'gemini-2.5-flash'
    });

    const adminHash = '$2b$10$ycVVpYmhtQaRYJi07NnqieaN5SX9Cjc8nxLCbh7asWPPyzuIwDCd2';
    const usersToCreate = [
      { name: 'Tawwakal Admin', email: 'alfazbilakhiya17@gmail.com', password: adminHash },
      { name: 'Admin', email: 'coronamarine@gmail.com', password: adminHash }
    ];

    for (const u of usersToCreate) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        await User.create(u);
        console.log(` - Admin user active: ${u.email}`);
      }
    }

    console.log("\n========================================================");
    console.log(" SUCCESS! Tawwakal Automation Database 100% Aligned!");
    console.log(" Total Subcategories:", createdCats.length);
    console.log(" Total Brands:", createdBrands.length);
    console.log(" Total Products:", createdProducts.length);
    console.log("========================================================\n");

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Seed execution failed:", err);
    process.exit(1);
  }
}

runSeed();

