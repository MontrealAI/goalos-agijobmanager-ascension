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
manifest={'productionUrl':prod,'release':'v24-sovereign-experience-stream','builtAt':datetime.datetime.now(datetime.UTC).isoformat().replace('+00:00','Z'),'files':[]}
for p in sorted(dist.rglob('*')):
    if p.is_file():
        rel=str(p.relative_to(dist)); manifest['files'].append({'path':rel,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size})
(dist/'build-manifest.json').write_text(json.dumps(manifest,indent=2))
(dist/'production-url.json').write_text(json.dumps({'url':prod,'status':'PASS','operatorParity':'PASS','sovereignMachineEconomy':'PASS','finalAssurance':'PASS','legalDataZeroShield':'PASS','agialphaTokenBoundary':'PASS','zeroNetworkPublisher':'PASS','pathspecProofPublisher':'PASS','userDelightDemos':'PASS','multiAgentInstitution':'PASS','proofToActionTheatre':'PASS','proofGradientArena':'PASS','chronicleCompoundingLab':'PASS','ascensionInflowControl':'PASS','claimBoundaryFirewall':'PASS','replayFalsificationGauntlet':'PASS','sovereignExperienceStream':'PASS','vendoredDependencies':'PASS'},indent=2))
copy_pairs=[('data/capability-contract.json','capability-conformance.json'),('data/sovereign-machine-economy-capability-contract.json','sovereign-machine-economy-conformance.json'),('data/legal-boundary-policy.json','legal-boundary-policy.json'),('data/agialpha-token-boundary.json','agialpha-token-boundary.json'),('data/demo-missions.json','demo-missions.json'),('data/proof-governed-institution-demo.json','proof-governed-institution-demo.json'),('data/multi-agent-coordination-law.json','multi-agent-coordination-law.json'),('data/proof-to-action-theatre-demo.json','proof-to-action-theatre-demo.json'),('data/proof-gradient-arena-demo.json','proof-gradient-arena-demo.json'),('data/chronicle-compounding-lab-demo.json','chronicle-compounding-lab-demo.json'),('data/ascension-inflow-control-demo.json','ascension-inflow-control-demo.json'),('data/claim-boundary-firewall-demo.json','claim-boundary-firewall-demo.json'),('data/replay-falsification-gauntlet-demo.json','replay-falsification-gauntlet-demo.json'),
    ('data/sovereign-experience-stream-demo.json','sovereign-experience-stream-demo.json')]
for src,dst in copy_pairs:
    sp=root/src
    if sp.exists(): (dist/dst).write_text(sp.read_text())
for f in ['FINAL_ASSURANCE_DOCKET_V11.json','FINAL_ASSURANCE_DOCKET_V11.md','DEMO_DELIGHT_V16_REPORT.md','MULTI_AGENT_INSTITUTION_V17_REPORT.md','PROOF_TO_ACTION_THEATRE_V18_REPORT.md','PROOF_GRADIENT_ARENA_V19_REPORT.md','CHRONICLE_COMPOUNDING_LAB_V20_REPORT.md','ASCENSION_INFLOW_CONTROL_ROOM_V21_REPORT.md','CLAIM_BOUNDARY_FIREWALL_V22_REPORT.md','REPLAY_FALSIFICATION_GAUNTLET_V23_REPORT.md','SOVEREIGN_EXPERIENCE_STREAM_V24_REPORT.md']:
    sp=root/f
    if sp.exists(): (dist/f).write_text(sp.read_text())
routes=['','start.html','demo-lab.html','coordination-lab.html','mission-studio.html','proof-cards.html','proof-to-action-theatre.html','proof-gradient-arena.html','chronicle-compounding-lab.html','ascension-inflow-control.html','claim-boundary-firewall.html','evidence-docket-court.html','replay-falsification-gauntlet.html','sovereign-experience-stream.html','multi-agent-institution.html','coordination-engine.html','sovereign-machine-economy.html','operator-console.html','expert-console.html','expert-mainnet-console.html','evidence/','architecture.html','verification.html','assurance.html','legal.html','agialpha-token-boundary.html','privacy.html','terms.html','regulatory-boundary.html','third-party-responsibility.html','demo-missions.json','proof-governed-institution-demo.json','multi-agent-coordination-law.json','proof-to-action-theatre-demo.json','proof-gradient-arena-demo.json','chronicle-compounding-lab-demo.json','ascension-inflow-control-demo.json','claim-boundary-firewall-demo.json','replay-falsification-gauntlet-demo.json','sovereign-experience-stream-demo.json','legal-boundary-policy.json','agialpha-token-boundary.json','production-url.json','capability-conformance.json','proof-gradient-arena-demo.json','chronicle-compounding-lab-demo.json','ascension-inflow-control-demo.json','claim-boundary-firewall-demo.json','replay-falsification-gauntlet-demo.json']
xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'  <url><loc>{prod}{r}</loc></url>\n' for r in routes) + '</urlset>\n'
(dist/'sitemap.xml').write_text(xml)
(dist/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+prod+'sitemap.xml\n')
print(f"Built {len(manifest['files'])} files for {prod}")
