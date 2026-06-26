from pathlib import Path
import sys,json
root=Path(__file__).resolve().parents[1]
required=['site/index.html','site/operator-console.html','site/evidence/index.html','site/architecture.html','site/verification.html','site/assets/atelier.css','site/assets/atelier.js','data/canonical-identities.json','data/evidence-docket-6-1.json']
missing=[p for p in required if not (root/p).exists()]
if missing: print('Missing:',missing); sys.exit(1)
text='\n'.join((root/p).read_text(errors='ignore') for p in required if p.endswith(('.html','.js','.json')))
need=['0xB3AAeb69b630f0299791679c063d68d6687481d1','0xa61a3b3a130a9c20768eebf97e21515a6046a1fa','https://montrealai.github.io/goalos-agijobmanager-ascension/','No wallet auto-connect','No token approval','No Mainnet broadcast']
miss=[x for x in need if x not in text]
if miss: print('Missing required text:',miss); sys.exit(1)
for bad in ['eth_sendTransaction','wallet_requestPermissions','ethereum.request({ method: "eth_requestAccounts"','approve(','PRIVATE_KEY_VALUE_SHOULD_NOT_EXIST']:
    if bad in text: print('Forbidden primitive:',bad); sys.exit(1)
print('AGIJobManager Ascension QA PASS')

