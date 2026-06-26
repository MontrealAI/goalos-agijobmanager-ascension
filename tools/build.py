from pathlib import Path
import shutil,json,hashlib,datetime
root=Path(__file__).resolve().parents[1]
dist=root/'dist'
if dist.exists(): shutil.rmtree(dist)
shutil.copytree(root/'site',dist)
(dist/'.nojekyll').write_text('')
manifest={'productionUrl':'https://montrealai.github.io/goalos-agijobmanager-ascension/','builtAt':datetime.datetime.utcnow().isoformat()+'Z','files':[]}
for p in sorted(dist.rglob('*')):
    if p.is_file():
        rel=str(p.relative_to(dist)); manifest['files'].append({'path':rel,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size})
(dist/'build-manifest.json').write_text(json.dumps(manifest,indent=2))
(dist/'production-url.json').write_text(json.dumps({'url':manifest['productionUrl'],'status':'PASS'},indent=2))

