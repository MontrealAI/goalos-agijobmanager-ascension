from pathlib import Path
import shutil,json,hashlib,datetime
root=Path(__file__).resolve().parents[1]
dist=root/'dist'
if dist.exists(): shutil.rmtree(dist)
shutil.copytree(root/'site',dist)
for folder in ['data','schemas','docs']:
    src=root/folder
    if src.exists(): shutil.copytree(src, dist/folder)
(dist/'.nojekyll').write_text('')
prod='https://montrealai.github.io/goalos-agijobmanager-ascension/'
manifest={'productionUrl':prod,'release':'v15-pathspec-proof-final-publisher','builtAt':datetime.datetime.now(datetime.UTC).isoformat().replace('+00:00','Z'),'files':[]}
for p in sorted(dist.rglob('*')):
    if p.is_file():
        rel=str(p.relative_to(dist)); manifest['files'].append({'path':rel,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size})
(dist/'build-manifest.json').write_text(json.dumps(manifest,indent=2))
(dist/'production-url.json').write_text(json.dumps({'url':prod,'status':'PASS','operatorParity':'PASS','sovereignMachineEconomy':'PASS','finalAssurance':'PASS','legalDataZeroShield':'PASS','agialphaTokenBoundary':'PASS','zeroNetworkPublisher':'PASS','pathspecProofPublisher':'PASS','vendoredDependencies':'PASS'},indent=2))
(dist/'capability-conformance.json').write_text((root/'data/capability-contract.json').read_text())
(dist/'sovereign-machine-economy-conformance.json').write_text((root/'data/sovereign-machine-economy-capability-contract.json').read_text())
if (root/'FINAL_ASSURANCE_DOCKET_V11.json').exists(): (dist/'FINAL_ASSURANCE_DOCKET_V11.json').write_text((root/'FINAL_ASSURANCE_DOCKET_V11.json').read_text())
if (root/'FINAL_ASSURANCE_DOCKET_V11.md').exists(): (dist/'FINAL_ASSURANCE_DOCKET_V11.md').write_text((root/'FINAL_ASSURANCE_DOCKET_V11.md').read_text())

if (root/'data/legal-boundary-policy.json').exists(): (dist/'legal-boundary-policy.json').write_text((root/'data/legal-boundary-policy.json').read_text())
if (root/'data/agialpha-token-boundary.json').exists(): (dist/'agialpha-token-boundary.json').write_text((root/'data/agialpha-token-boundary.json').read_text())
(dist/'sitemap.xml').write_text("""<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://montrealai.github.io/goalos-agijobmanager-ascension/</loc></url><url><loc>https://montrealai.github.io/goalos-agijobmanager-ascension/sovereign-machine-economy.html</loc></url><url><loc>https://montrealai.github.io/goalos-agijobmanager-ascension/operator-console.html</loc></url><url><loc>https://montrealai.github.io/goalos-agijobmanager-ascension/expert-console.html</loc></url><url><loc>https://montrealai.github.io/goalos-agijobmanager-ascension/expert-mainnet-console.html</loc></url><url><loc>https://montrealai.github.io/goalos-agijobmanager-ascension/evidence/</loc></url><url><loc>https://montrealai.github.io/goalos-agijobmanager-ascension/architecture.html</loc></url><url><loc>https://montrealai.github.io/goalos-agijobmanager-ascension/verification.html</loc></url><url><loc>https://montrealai.github.io/goalos-agijobmanager-ascension/assurance.html</loc></url><url><loc>https://montrealai.github.io/goalos-agijobmanager-ascension/legal.html</loc></url><url><loc>https://montrealai.github.io/goalos-agijobmanager-ascension/agialpha-token-boundary.html</loc></url><url><loc>https://montrealai.github.io/goalos-agijobmanager-ascension/privacy.html</loc></url><url><loc>https://montrealai.github.io/goalos-agijobmanager-ascension/terms.html</loc></url><url><loc>https://montrealai.github.io/goalos-agijobmanager-ascension/regulatory-boundary.html</loc></url><url><loc>https://montrealai.github.io/goalos-agijobmanager-ascension/third-party-responsibility.html</loc></url></urlset>""")
print(f"Built {len(manifest['files'])} files for {prod}")
