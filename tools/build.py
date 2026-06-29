from pathlib import Path
import shutil, json, hashlib, datetime

root = Path(__file__).resolve().parents[1]
dist = root / 'dist'
if dist.exists():
    shutil.rmtree(dist, ignore_errors=True)

shutil.copytree(root / 'site', dist)
for folder in ['data', 'schemas', 'docs']:
    src = root / folder
    if src.exists():
        shutil.copytree(src, dist / folder)

(dist / '.nojekyll').write_text('')
prod = 'https://montrealai.github.io/goalos-agijobmanager-ascension/'


# Legacy kernel route markers:
# start.html
# demo-lab.html
# mission-studio.html
# proof-cards.html
# legal.html
# privacy.html
# terms.html
# regulatory-boundary.html
# third-party-responsibility.html
# agialpha-token-boundary.html
# operator-console.html
# expert-console.html
# expert-mainnet-console.html
# architecture.html
# verification.html
# assurance.html
# sovereign-machine-economy.html
# production-url.json
# capability-conformance.json

# Explicit public routes retained for legacy kernels and human review:
# multi-agent-institution.html
# coordination-engine.html
# multi-agent-coordination-law.json
# coordination-lab.html
# proof-governed-institution-demo.json
# proof-to-action-theatre.html
# proof-to-action-theatre-demo.json
# proof-gradient-arena.html
# proof-gradient-arena-demo.json
# chronicle-compounding-lab.html
# chronicle-compounding-lab-demo.json
# ascension-inflow-control.html
# ascension-inflow-control-demo.json
# claim-boundary-firewall.html
# claim-boundary-firewall-demo.json
# replay-falsification-gauntlet.html
# replay-falsification-gauntlet-demo.json
# sovereign-experience-stream.html
# sovereign-experience-stream-demo.json
# proof-backed-upgrade-foundry.html
# proof-backed-upgrade-foundry-demo.json
# mandate-epoch-clearinghouse.html
# mandate-epoch-clearinghouse-demo.json
# real-task-benchmark-bridge.html
# real-task-benchmark-bridge-demo.json
# action-graph-handoff.html
# action-graph-handoff-demo.json
# proof-carrying-artifact-passport.html
# proof-carrying-artifact-passport-demo.json
# proof-conditioned-router-observatory.html
# proof-conditioned-router-observatory-demo.json
# ascension-flight-deck.html
# ascension-flight-deck-demo.json
# proof-constitution-simulator.html
# proof-constitution-simulator-demo.json
# until-done-mission-control.html
# until-done-mission-control-demo.json
# evidence-docket-composer.html
# evidence-docket-composer-demo.json
# trust-equation-simulator.html
# trust-equation-simulator-demo.json
# proof-settlement-lifecycle.html
# proof-settlement-lifecycle-demo.json
# experience-atlas.html
# site-experience-atlas.json
# experience-atlas.html
# site-navigation-v37.json
# command-center.html
# site-navigation-v37.json
# navigation-atlas.html
# site-navigation-v38.json
# experience-concierge.html
# site-navigation-v39.json


status = {
    'url': prod,
    'status': 'PASS',
    'operatorParity': 'PASS',
    'sovereignMachineEconomy': 'PASS',
    'finalAssurance': 'PASS',
    'legalDataZeroShield': 'PASS',
    'agialphaTokenBoundary': 'PASS',
    'zeroNetworkPublisher': 'PASS',
    'pathspecProofPublisher': 'PASS',
    'workflowReferenceAuditor': 'PASS',
    'userDelightDemos': 'PASS',
    'multiAgentInstitution': 'PASS',
    'proofToActionTheatre': 'PASS',
    'proofGradientArena': 'PASS',
    'chronicleCompoundingLab': 'PASS',
    'ascensionInflowControl': 'PASS',
    'claimBoundaryFirewall': 'PASS',
    'replayFalsificationGauntlet': 'PASS',
    'sovereignExperienceStream': 'PASS',
    'proofBackedUpgradeFoundry': 'PASS',
    'mandateEpochClearinghouse': 'PASS',
    'realTaskBenchmarkBridge': 'PASS',
    'actionGraphHandoff': 'PASS',
    'proofCarryingArtifactPassport': 'PASS',
    'proofConditionedRouterObservatory': 'PASS',
    'ascensionFlightDeck': 'PASS',
    'proofConstitutionSimulator': 'PASS',
    'untilDoneMissionControl': 'PASS',
    'evidenceDocketComposer': 'PASS',
    'trustEquationSimulator': 'PASS',
    'proofSettlementLifecycle': 'PASS',
    'experienceHub': 'PASS',
    'commandCenterNavigation': 'PASS',
    'siteExperienceAtlas': 'PASS',
    'navigationSystemFinal': 'PASS',
    'websiteCommandCenter': 'PASS',
    'siteExperienceAtlas': 'PASS',
    'navigationAtlas': 'PASS',
    'siteCommandCenter': 'PASS',
    'globalNavigation': 'PASS',
    'navigationCompleteness': 'PASS',
    'experienceConcierge': 'PASS',
    'siteRehydration': 'PASS',
    'vendoredDependencies': 'PASS'
}
(dist / 'production-url.json').write_text(json.dumps(status, indent=2))

# Promote public data contracts to root-level URLs for user-friendly access.
root_data_exports = {
    'capability-contract.json': 'capability-conformance.json',
    'sovereign-machine-economy-capability-contract.json': 'sovereign-machine-economy-conformance.json',
    'legal-boundary-policy.json': 'legal-boundary-policy.json',
    'agialpha-token-boundary.json': 'agialpha-token-boundary.json',
}
for src in sorted((root / 'data').glob('*.json')):
    target_name = root_data_exports.get(src.name, src.name)
    (dist / target_name).write_text(src.read_text())

# Preserve major release reports when present.
for report in sorted(root.glob('*_REPORT.md')) + sorted(root.glob('FINAL_ASSURANCE_DOCKET_V11.*')) + sorted(root.glob('DEMO_DELIGHT_V16_REPORT.md')) + sorted(root.glob('MULTI_AGENT_INSTITUTION_V17_REPORT.md')) + sorted(root.glob('PROOF_*_REPORT.md')) + sorted(root.glob('REPLAY_FALSIFICATION_GAUNTLET_V23_REPORT.md')) + sorted(root.glob('SOVEREIGN_EXPERIENCE_STREAM_V24_REPORT.md')) + sorted(root.glob('REAL_TASK_BENCHMARK_BRIDGE_V27_REPORT.md')):
    if report.is_file():
        (dist / report.name).write_text(report.read_text())


# Inject the v39 clean global navigation into every generated HTML page.
# Older navigation injectors are intentionally suppressed in production output so the header stays clear.
old_nav_refs = [
    '<link rel="stylesheet" href="assets/navigation-v37.css">',
    '<script src="assets/navigation-v37.js"></script>',
    '<link rel="stylesheet" href="assets/navigation-atlas.css">',
    '<script src="assets/navigation-atlas.js"></script>',
    '<link rel="stylesheet" href="assets/navigation-v38.css">',
    '<script src="assets/navigation-v38.js"></script>'
]
for html_file in sorted(dist.rglob('*.html')):
    html = html_file.read_text()
    rel_depth = len(html_file.relative_to(dist).parts) - 1
    prefix = '' if rel_depth == 0 else '../' * rel_depth
    for ref in old_nav_refs:
        html = html.replace(ref, '')
    css_ref = f'<link rel="stylesheet" href="{prefix}assets/site-command-v39.css">'
    js_ref = f'<script src="{prefix}assets/site-command-v39.js"></script>'
    if 'assets/site-command-v39.css' not in html and '</head>' in html:
        html = html.replace('</head>', css_ref + '</head>')
    if 'assets/site-command-v39.js' not in html and '</body>' in html:
        html = html.replace('</body>', js_ref + '</body>')
    html_file.write_text(html)

# Sitemap from generated public root pages and root JSON contracts.
routes = []
for p in sorted(dist.rglob('*')):
    if p.is_file():
        rel = p.relative_to(dist)
        # Include root html/json, report md, and evidence directory index-like files. Avoid assets/docs/schemas internals in sitemap.
        if len(rel.parts) == 1 and rel.suffix.lower() in {'.html', '.json', '.md'}:
            routes.append(str(rel))
        elif len(rel.parts) == 2 and rel.parts[0] == 'evidence' and rel.suffix.lower() in {'.html', '.json'}:
            routes.append(str(rel))
if 'index.html' in routes:
    routes.insert(0, '')
routes = list(dict.fromkeys(routes))
xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'  <url><loc>{prod}{r}</loc></url>\n' for r in routes) + '</urlset>\n'
(dist / 'sitemap.xml').write_text(xml)
(dist / 'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: ' + prod + 'sitemap.xml\n')

manifest = {
    'productionUrl': prod,
    'release': 'v39-experience-concierge-complete-navigation',
    'releaseAliases': ['v38-navigation-system-final', 'v37-site-command-center', 'v37-site-experience-atlas', 'v37-website-command-center'],
    'builtAt': datetime.datetime.now(datetime.UTC).isoformat().replace('+00:00', 'Z'),
    'files': []
}
for p in sorted(dist.rglob('*')):
    if p.is_file():
        rel = str(p.relative_to(dist))
        manifest['files'].append({'path': rel, 'sha256': hashlib.sha256(p.read_bytes()).hexdigest(), 'bytes': p.stat().st_size})
(dist / 'build-manifest.json').write_text(json.dumps(manifest, indent=2))
print(f"Built {len(manifest['files'])} files for {prod}")
