import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, X } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import ReactMarkdown from 'react-markdown';

const fallbackPosts = [
  {
    title: 'The Future of Industrial Automation in South Africa',
    excerpt: 'How Industry 4.0 and IIoT are transforming manufacturing and processing plants across South Africa.',
    category: 'industry_news',
    author: 'T.M Engineering',
    created_date: '2025-03-01',
    cover_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    status: 'published',
    content: `## Industry 4.0 is Here — Is South Africa Ready?

The fourth industrial revolution is no longer a distant concept. Across South Africa's manufacturing heartland — from Gauteng's industrial corridors to the Western Cape's food and beverage sector — factories are embracing automation at an accelerating pace.

### What is Industry 4.0?

Industry 4.0 refers to the integration of digital technologies into industrial processes. At its core, it combines:

- **IIoT (Industrial Internet of Things)** — machines and sensors communicating in real-time
- **Cloud computing** — centralised data storage and analysis
- **AI and machine learning** — predictive maintenance and quality control
- **Advanced robotics** — collaborative robots (cobots) working alongside humans
- **SCADA and MES systems** — real-time production visibility

### The South African Context

South African manufacturers face unique pressures: load-shedding, rising energy costs, skills shortages and global competition. Automation directly addresses all of these:

- **Load-shedding resilience**: Automated systems with UPS and generator integration keep production running during outages
- **Energy efficiency**: VSDs and power monitoring systems reduce electricity consumption by 20–40%
- **Skills gap**: Automated systems require fewer operators while producing more consistently
- **Global competitiveness**: South African exporters need world-class OEE (Overall Equipment Effectiveness) to compete

### What T.M Engineering is Seeing

Over the past five years, we have seen a dramatic increase in clients requesting:

1. **Remote monitoring** — the ability to view production data from a smartphone or tablet
2. **Predictive maintenance alerts** — notifications before equipment fails rather than after
3. **Energy dashboards** — real-time kWh consumption per production unit
4. **Paperless quality control** — electronic batch records replacing paper-based systems

### The Road Ahead

The companies investing in automation today will be the ones still operating competitively in 2030. With South Africa's National Development Plan prioritising industrialisation, and incentives available for capital investment, the window to act is now.

T.M Engineering has been at the forefront of South African industrial automation for 39 years. We are ready to guide your business through the Industry 4.0 transition — from a single PLC upgrade to a complete smart factory implementation.`
  },
  {
    title: 'PLC vs DCS: Which Control System is Right for Your Plant?',
    excerpt: 'A comprehensive guide to choosing between PLCs and distributed control systems for industrial applications.',
    category: 'automation',
    author: 'T.M Engineering',
    created_date: '2025-02-15',
    cover_image: 'https://media.base44.com/images/public/69fefc1890408637f331f461/1978c612b_plc.jpg',
    status: 'published',
    content: `## PLC vs DCS: Making the Right Choice for Your Facility

One of the most common questions we receive from plant managers and engineering teams is: *"Should we use a PLC or a DCS?"* The answer depends on your application, scale and operational requirements.

### What is a PLC?

A **Programmable Logic Controller (PLC)** is a ruggedised computer designed for industrial automation. It executes ladder logic or structured text programs to control machinery and processes in real time.

**Best for:**
- Discrete manufacturing (packaging, assembly, conveying)
- Machine control (labellers, fillers, conveyor systems)
- Applications requiring fast scan times (< 10ms)
- Smaller to medium-scale installations
- Budget-conscious projects

**Common brands:** Siemens S7, Allen-Bradley (Rockwell), Schneider Modicon, Mitsubishi

### What is a DCS?

A **Distributed Control System (DCS)** is an architecture where controllers are distributed throughout the plant, connected via a high-speed network to a central supervisory system.

**Best for:**
- Continuous process industries (chemical, petrochemical, water treatment)
- Large-scale facilities with hundreds or thousands of I/O points
- Applications requiring tight loop control (temperature, pressure, flow)
- Plants where system-wide coordination is critical

**Common brands:** Honeywell, ABB, Emerson DeltaV, Yokogawa

### Key Differences at a Glance

| Feature | PLC | DCS |
|---|---|---|
| Best for | Discrete / batch | Continuous process |
| Scan time | Very fast (1–10ms) | Slower (100–500ms) |
| Scalability | Moderate | Very high |
| Cost | Lower | Higher |
| Redundancy | Optional | Built-in |
| Integration | Via SCADA add-on | Native |

### The Hybrid Approach

Many modern facilities — particularly in food & beverage and pharmaceutical — use a hybrid approach: PLCs for machine-level control, with a SCADA system providing the supervisory layer. This gives you the speed and cost benefits of PLCs with the visibility of a DCS.

### Our Recommendation

For most South African manufacturers, a **PLC + SCADA combination** offers the best balance of cost, flexibility and performance. T.M Engineering specialises in Siemens TIA Portal, Allen-Bradley, Schneider and Mitsubishi platforms — we can advise you on the best architecture for your specific application.

Contact us for a free consultation.`
  },
  {
    title: 'How to Reduce Downtime with Preventive Maintenance',
    excerpt: 'Practical strategies for FMCG and manufacturing plants to minimise unplanned stoppages and maximise OEE.',
    category: 'tips',
    author: 'T.M Engineering',
    created_date: '2025-01-20',
    cover_image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    status: 'published',
    content: `## How to Reduce Downtime: A Practical Guide for South African Manufacturers

Unplanned downtime is the enemy of productivity. In South African FMCG and manufacturing, a single hour of downtime can cost anywhere from R50,000 to R500,000 in lost production. Yet most companies still operate reactively — fixing equipment only after it breaks.

### The Real Cost of Reactive Maintenance

When a machine breaks unexpectedly, the costs extend far beyond the repair bill:

- **Lost production**: Every minute the line is stopped costs money
- **Emergency call-out rates**: After-hours repairs cost 2–3x more than planned maintenance
- **Spare parts availability**: Emergency parts sourcing is expensive and slow
- **Food safety risks**: In food manufacturing, unexpected stoppages can cause contamination
- **Staff overtime**: Production catch-up requires overtime pay

### The Preventive Maintenance Framework

A solid preventive maintenance (PM) programme addresses equipment before it fails. Here's how to implement one:

**1. Asset Register**
Start by listing every piece of equipment in your facility with its make, model, serial number and criticality rating (A = production-critical, B = important, C = non-critical).

**2. Maintenance Schedules**
For each A and B asset, define:
- Daily checks (operator-performed)
- Weekly inspections (maintenance team)
- Monthly services (including lubrication, belt tension, filter changes)
- Annual overhauls

**3. Electrical Preventive Maintenance**
Don't neglect your electrical systems. T.M Engineering recommends:
- **Thermal imaging scans** of all MCC and distribution panels (annually)
- **Insulation resistance testing** of motors and cables
- **Contact resistance checks** on contactors and circuit breakers
- **VSD parameter backups** — ensure drive programs are saved
- **PLC battery replacement** — most PLC batteries last 3–5 years

**4. VSD and Drive Maintenance**
Variable speed drives are expensive and often overlooked. Key maintenance tasks:
- Clean cooling fans and heat sinks (dust buildup causes overheating)
- Check DC bus capacitors (they degrade over time)
- Verify parameter settings match motor nameplate data
- Test safety functions (STO, SS1) annually

**5. Tracking and Reporting**
Use a simple spreadsheet or CMMS (Computerised Maintenance Management System) to track:
- Work orders completed vs. scheduled
- Mean Time Between Failures (MTBF) per asset
- Maintenance cost per machine per month

### The Payoff

Companies that implement structured PM programmes typically see:
- **30–50% reduction** in unplanned downtime within 12 months
- **15–25% extension** in equipment lifespan
- **Significant reduction** in emergency repair costs

T.M Engineering offers planned maintenance contracts for FMCG, pharmaceutical and manufacturing facilities across Gauteng. Our team of industrial electricians and automation engineers will keep your plant running at peak efficiency.`
  },
  {
    title: 'SCADA Systems: A Complete Guide for South African Manufacturers',
    excerpt: 'Everything you need to know about implementing SCADA systems in your South African manufacturing facility.',
    category: 'automation',
    author: 'T.M Engineering',
    created_date: '2025-01-05',
    cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    status: 'published',
    content: `## SCADA Systems: Your Complete Implementation Guide

If you can't see it, you can't improve it. SCADA (Supervisory Control and Data Acquisition) systems give plant managers and engineers real-time visibility into every aspect of their production process — from individual machine speeds to factory-wide energy consumption.

### What Does a SCADA System Do?

A SCADA system sits above your PLCs and field devices, collecting data and presenting it in an intuitive graphical interface. Key functions include:

- **Real-time monitoring** — live view of plant status, alarms and production counts
- **Alarming** — instant notification when something goes wrong (via screen, email or SMS)
- **Historical data** — trend graphs and reports for analysis and compliance
- **Remote access** — view and control your plant from anywhere via secure web connection
- **Recipe management** — store and recall product-specific parameters
- **KPI dashboards** — OEE, throughput, waste and energy metrics

### Popular SCADA Platforms

**Wonderware (AVEVA)**
The market leader in South Africa. Wonderware InTouch is widely used in FMCG, pharmaceutical and mining. The System Platform version offers object-oriented design for large installations. T.M Engineering is an experienced Wonderware integrator.

**Ignition by Inductive Automation**
A modern, web-based SCADA platform that has grown rapidly in popularity. Advantages include unlimited clients (no per-seat licensing), HTML5 web interface and powerful reporting tools. Excellent value for money.

**iFix (GE/Proficy)**
Strong in pharmaceutical and life sciences applications, particularly where 21 CFR Part 11 compliance is required.

### The Implementation Process

A typical SCADA project follows these stages:

1. **Requirements gathering** — what do you need to see and control?
2. **Architecture design** — server topology, network design, redundancy requirements
3. **I/O mapping** — identifying all data points to be monitored
4. **PLC communication** — OPC-UA, Ethernet/IP or Modbus connections to field devices
5. **Screen development** — P&ID mimics, dashboards and alarm screens
6. **Historian configuration** — which tags to trend and for how long
7. **Testing and commissioning** — factory acceptance test (FAT) followed by site commissioning
8. **Operator training** — ensuring your team can use the system effectively

### What Does it Cost?

SCADA system costs vary widely depending on scope. As a rough guide:

- **Small system** (1 PLC, 50–100 tags, basic screens): R80,000–R150,000
- **Medium system** (3–5 PLCs, 500–1,000 tags, full dashboards): R250,000–R500,000
- **Large system** (multi-site, 10,000+ tags, historian): R800,000+

T.M Engineering provides detailed quotations based on your specific requirements. Contact us for a free assessment.`
  },
  {
    title: 'MCC Panels: Design Best Practices and SANS Standards',
    excerpt: 'A technical deep-dive into motor control centre design, protection coordination and compliance with South African standards.',
    category: 'plc',
    author: 'T.M Engineering',
    created_date: '2024-12-10',
    cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    status: 'published',
    content: `## MCC Panel Design: Best Practices for South African Industrial Applications

A Motor Control Centre (MCC) is the heart of your electrical distribution system. Get the design right and your facility will run reliably for decades. Get it wrong and you face nuisance tripping, equipment damage, regulatory non-compliance and potentially catastrophic failures.

### What is an MCC?

An MCC is a centralised enclosure that houses the components used to control, protect and distribute power to multiple electric motors. A well-designed MCC contains:

- **Incoming supply** — main circuit breaker or isolator
- **Busbars** — copper conductors distributing power to each motor section
- **Motor starter sections** — each containing a contactor, overload relay and circuit breaker
- **Metering** — current transformers, power meters and energy monitoring
- **Control wiring** — 24V DC or 110V AC control circuits to PLCs and field devices

### SANS Standards You Must Know

South African MCC design must comply with:

- **SANS 61439** (formerly SANS 60439) — Low-voltage switchgear and controlgear assemblies
- **SANS 10142** — Installation of electrical equipment
- **SANS 10087** — Handling of flammable liquids (where applicable)
- **NEMA or IP ratings** — appropriate ingress protection for the environment

### Protection Coordination — Getting it Right

One of the most critical aspects of MCC design is protection coordination — ensuring that faults are cleared at the correct level without causing widespread tripping.

**Key principles:**
1. **Discrimination**: The device closest to the fault should trip first
2. **Cascade protection**: Verify that breaker combinations are tested and approved by manufacturers
3. **Motor protection**: Overload relays must be set correctly to the motor FLA (Full Load Amps)
4. **Earth fault protection**: Residual current devices (RCDs) or earth leakage relays protect against ground faults

### Soft Starters vs VSDs vs DOL

Choosing the right starting method is critical for motor longevity and energy efficiency:

| Method | Best For | Energy Saving | Cost |
|---|---|---|---|
| DOL (Direct-On-Line) | Small motors < 5.5kW | None | Lowest |
| Star-Delta | Medium motors 5.5–75kW | Minimal | Low |
| Soft Starter | Fixed-speed applications | Moderate | Medium |
| VSD (Variable Speed Drive) | Variable load applications | 20–50% | Highest |

### T.M Engineering's MCC Build Standard

Every MCC we manufacture includes:

- Full electrical drawings (compiled in EPLAN or AutoCAD Electrical)
- Ferrule-labelled wiring throughout
- Terminal blocks for all field connections
- Anti-condensation heaters where required
- Full FAT (Factory Acceptance Test) before delivery
- Certificate of compliance on completion

All panels are manufactured at our Strijdom Park facility and can be transported and installed by our team anywhere in South Africa.`
  },
  {
    title: 'Case Study: 60% Downtime Reduction at a Food Processing Facility',
    excerpt: 'How T.M Engineering transformed a food processing production line with modern PLC automation and SCADA monitoring.',
    category: 'case_study',
    author: 'T.M Engineering',
    created_date: '2024-11-22',
    cover_image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    status: 'published',
    content: `## Case Study: 60% Downtime Reduction Through Automation

**Client:** Large FMCG food processing manufacturer, Gauteng
**Challenge:** Aging relay-based control systems causing frequent breakdowns and production losses
**Solution:** Full PLC retrofit with Siemens S7-1500, new MCC and Wonderware SCADA implementation
**Result:** 60% reduction in unplanned downtime within 6 months

---

### The Problem

Our client operated a high-speed production line producing approximately 3,000 units per hour across two shifts. The facility was running on aging relay-based control panels installed in the early 1990s. 

The engineering team was experiencing:
- **Average of 4–6 unplanned stoppages per shift**, each lasting 20–45 minutes
- **No fault history** — when a fault occurred, the team had to manually trace relay circuits to find the problem
- **Obsolete components** — several relay types were no longer manufactured, requiring expensive custom orders
- **No remote visibility** — management had no real-time production data
- **Food safety concerns** — unexpected stoppages were contaminating product batches

The estimated cost of downtime was R180,000 per month in lost production alone.

### The T.M Engineering Solution

After a detailed site survey and operational assessment, we proposed a phased retrofit to minimise production disruption:

**Phase 1: New Siemens S7-1500 PLC System**

We replaced all relay logic with a modern Siemens S7-1500 CPU with distributed ET200SP I/O modules at each machine station. The new program was written in TIA Portal with structured function blocks for each machine section.

Key features of the new control system:
- Comprehensive fault messaging — every fault displays a clear description on the HMI
- Automatic fault logging with timestamp
- Interlocking between machine sections to prevent damage on downstream faults
- Soft-start ramp control for all conveyor drives

**Phase 2: New MCC with VSDs**

The old direct-on-line starters were replaced with a new MCC incorporating:
- Siemens SIRIUS soft starters for pump and blower motors
- ABB ACS580 VSDs for all conveyor drives
- Schneider PowerLogic energy meters on each feeder
- Full SANS 61439-compliant build with FAT documentation

**Phase 3: Wonderware InTouch SCADA**

We implemented a Wonderware InTouch SCADA system providing:
- Live P&ID view of the entire production line
- Real-time production counts, speed and efficiency metrics
- OEE dashboard (Availability, Performance, Quality)
- Email and SMS alerts for critical faults
- Shift production reports automatically generated

### The Results

Six months after commissioning:

| Metric | Before | After | Improvement |
|---|---|---|---|
| Unplanned stoppages/shift | 4–6 | 1–2 | **60% reduction** |
| Average fault resolution time | 38 min | 12 min | **68% faster** |
| Energy consumption | Baseline | -22% | **R45,000/month saving** |
| OEE | 61% | 79% | **+18 percentage points** |

The client recovered the full cost of the project within **14 months** through energy savings and increased production output.

### Client Feedback

*"The T.M Engineering team were professional, technically excellent and worked around our production schedule to minimise disruption. The new system has transformed our operation — our maintenance team now receives a fault description on their phone before they even walk to the machine."*
— Production Manager

---

Contact T.M Engineering to discuss how we can improve reliability and efficiency at your facility.`
  },
];

const catLabels = { automation: 'Automation', plc: 'PLC', industry_news: 'Industry News', case_study: 'Case Study', tips: 'Tips & Guides', company_news: 'Company News' };
const catColors = { automation: 'bg-primary/8 text-primary border-primary/15', plc: 'bg-purple-400/8 text-purple-400 border-purple-400/15', industry_news: 'bg-accent/8 text-accent border-accent/15', case_study: 'bg-green-400/8 text-green-400 border-green-400/15', tips: 'bg-yellow-400/8 text-yellow-400 border-yellow-400/15', company_news: 'bg-blue-400/8 text-blue-400 border-blue-400/15' };
const cats = ['All', 'Automation', 'PLC', 'Industry News', 'Case Study', 'Tips & Guides'];

export default function Blog() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const { data: posts = [] } = useQuery({
    queryKey: ['blog-published'],
    queryFn: () => base44.entities.BlogPost.filter({ status: 'published' }, '-created_date'),
  });

  const display = (posts.length > 0 ? posts : fallbackPosts).filter(p =>
    filter === 'All' || catLabels[p.category] === filter
  );

  return (
    <div className="pt-16">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80" alt="Blog" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/88" />
          <div className="absolute inset-0 grid-pattern opacity-40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Industry Insights
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-5">Blog & Insights</h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              Expert insights on industrial automation, PLC programming, SCADA systems and the latest trends in South African manufacturing.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-10 pb-1">
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {display.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div onClick={() => setSelected(p)} className="group cursor-pointer rounded-2xl bg-card border border-border hover:border-primary/25 transition-all overflow-hidden gradient-border h-full flex flex-col">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img src={p.cover_image || 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80'} alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold ${catColors[p.category] || 'bg-primary/8 text-primary border-primary/15'}`}>
                        {catLabels[p.category] || p.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">{p.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1 mb-4">{p.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {p.created_date ? new Date(p.created_date).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                      </div>
                      <span className="text-primary font-semibold flex items-center gap-1">Read <ArrowRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Article modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm overflow-y-auto py-8 px-4"
            onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
              className="relative w-full max-w-3xl bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}>
              <div className="relative h-56 md:h-72 overflow-hidden">
                <img src={selected.cover_image} alt={selected.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <button onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/60 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors">
                  <X className="w-4 h-4 text-foreground" />
                </button>
                <div className="absolute bottom-4 left-5">
                  <span className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold ${catColors[selected.category] || 'bg-primary/8 text-primary border-primary/15'}`}>
                    {catLabels[selected.category] || selected.category}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-black text-foreground mb-2 leading-tight">{selected.title}</h2>
                <p className="text-xs text-muted-foreground mb-6">
                  {selected.author} &nbsp;·&nbsp;{' '}
                  {selected.created_date ? new Date(selected.created_date).toLocaleDateString('en-ZA', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                </p>
                <div className="prose prose-sm prose-invert max-w-none text-muted-foreground
                  [&_h2]:text-foreground [&_h2]:font-black [&_h2]:text-lg [&_h2]:mt-6 [&_h2]:mb-3
                  [&_h3]:text-foreground [&_h3]:font-bold [&_h3]:text-base [&_h3]:mt-5 [&_h3]:mb-2
                  [&_p]:leading-relaxed [&_p]:mb-3
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:mb-3
                  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_ol]:mb-3
                  [&_li]:text-sm [&_li]:text-muted-foreground
                  [&_strong]:text-foreground [&_strong]:font-semibold
                  [&_em]:text-foreground/80
                  [&_table]:w-full [&_table]:border-collapse [&_table]:mb-4
                  [&_th]:text-left [&_th]:text-xs [&_th]:font-bold [&_th]:text-foreground [&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:bg-secondary
                  [&_td]:text-xs [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2
                  [&_hr]:border-border [&_hr]:my-6
                  [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground">
                  <ReactMarkdown>{selected.content || selected.excerpt}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
    </div>
  );
}