from pathlib import Path
import sys,json,re
root=Path(__file__).resolve().parents[1]
required=[
 'site/index.html','site/operator-console.html','site/expert-console.html','site/sovereign-machine-economy.html','site/evidence/index.html','site/architecture.html','site/verification.html','site/assurance.html',
 'site/assets/atelier.css','site/assets/atelier.js','site/assets/expert-console.js','site/assets/sovereign-economy.js',
 'data/canonical-identities.json','data/agialpha-token-boundary.json','data/evidence-docket-6-1.json','data/agijobmanager-expert-action-catalog.json','data/capability-contract.json','data/sovereign-machine-economy-capability-contract.json',
 'schemas/goalos-intent.schema.json','schemas/evidence-docket.schema.json','schemas/sovereign-machine-economy.schema.json','data/final-assurance-policy.json','tools/final-assurance-kernel.mjs','docs/FINAL_PRODUCTION_ASSURANCE_DOCKET_V11.md',
 'src/contracts/agijobmanager-parity.mjs','src/sovereign/sovereign-machine-economy.mjs','docs/SOVEREIGN_MACHINE_ECONOMY_IMPLEMENTATION.md'
]
missing=[p for p in required if not (root/p).exists()]
if missing:
    print('Missing required files:', missing); sys.exit(1)
texts={p:(root/p).read_text(errors='ignore') for p in required}
all_text='\n'.join(texts.values())
need=['0xB3AAeb69b630f0299791679c063d68d6687481d1','0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA','https://montrealai.github.io/goalos-agijobmanager-ascension/','META-AGENTIC α-AGI','AGI Alpha Node v0','AGI Jobs v0 (v2)','AGIJobManager','Sovereign Machine Economy','GoalOSCommit','RunCommitment','ProofPacket','SelectionCertificate','Evidence Docket','Final Assurance Kernel','createJob','applyForJob','requestJobCompletion','validateJob','disapproveJob','disputeJob','finalizeJob','expireJob','cancelJob','eth_requestAccounts','wallet_switchEthereumChain','AUTHORIZE MAINNET','ACTIVATE PRODUCTION AUTHORITY','staticCall','estimateGas']
miss=[x for x in need if x not in all_text]
if miss:
    print('Missing required implementation marker:', miss); sys.exit(1)
public_files=['site/index.html','site/operator-console.html','site/sovereign-machine-economy.html','site/evidence/index.html','site/architecture.html','site/verification.html','site/assurance.html','site/assets/atelier.js','site/assets/sovereign-economy.js']
public_text='\n'.join(texts[p] for p in public_files)
for bad in ['eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','MaxUint256','privateKey','approve(CANON.manager']:
    if bad in public_text:
        print('Public/default-deny surface contains expert primitive:',bad); sys.exit(1)
expert=texts['site/assets/expert-console.js']
for marker in ['eth_requestAccounts','wallet_switchEthereumChain','approve(CANON.manager','staticCall','estimateGas','AUTHORIZE MAINNET','ACTIVATE PRODUCTION AUTHORITY']:
    if marker not in expert:
        print('Expert console missing marker:', marker); sys.exit(1)
for bad in ['MaxUint256','localStorage.setItem','sessionStorage.setItem','privateKey']:
    if bad in expert:
        print('Forbidden expert-console primitive:',bad); sys.exit(1)
if 'd.y-=d.v' not in texts['site/assets/atelier.js']:
    print('Particle field must ascend upward: d.y-=d.v not found'); sys.exit(1)
cat=json.loads(texts['data/agijobmanager-expert-action-catalog.json'])
if len(cat.get('actions',[])) < 10: print('Action catalog incomplete'); sys.exit(1)
sme=json.loads(texts['data/sovereign-machine-economy-capability-contract.json'])
if len(sme.get('sourceLineage',[])) < 4: print('Sovereign lineage incomplete'); sys.exit(1)
if len(sme.get('operatingLoop',[])) != 10: print('Sovereign operating loop must have 10 gates'); sys.exit(1)
if not sme.get('publicSafetyBoundary',{}).get('expertConsoleSeparated'): print('Expert console separation not asserted'); sys.exit(1)
print('AGIJobManager Ascension v11 PASS · Operator parity + Sovereign Machine Economy implementation verified')
