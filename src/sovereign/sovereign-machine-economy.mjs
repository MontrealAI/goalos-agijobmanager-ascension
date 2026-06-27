export const PRODUCTION_URL = 'https://montrealai.github.io/goalos-agijobmanager-ascension/';
export const CANONICAL = { manager: '0xB3AAeb69b630f0299791679c063d68d6687481d1', agialpha: '0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA', chainId: 1 };
export const SOURCE_LINEAGE = [
  ['META-AGENTIC α-AGI','Institution Foundry','GoalOSCommit','SelectionCertificate'],
  ['AGI Alpha Node v0','Deterministic Runtime','RunCommitment','ProofPacket'],
  ['AGI Jobs v0 (v2)','Work OS','JobSpec','Chronicle'],
  ['AGIJobManager','Settlement Rail','Escrow','Finalization']
];
export const SOVEREIGN_LOOP = ['mandate','compose','route','execute','prove','validate','settle','chronicle','select','rollback'];
export function composeSovereignDocket(input = {}) {
  const objective = input.objective || 'Convert a bounded machine-work mandate into proof-settled institutional capability.';
  return {
    docketVersion: '6.1-sme-v10',
    objective,
    canonical: CANONICAL,
    institutions: SOURCE_LINEAGE.map(([name, role, inputObject, outputObject], index) => ({ index:index+1, name, role, inputObject, outputObject })),
    proofObjects: ['GoalOSCommit','RunCommitment','ProofPacket','EvalAttestation','SelectionCertificate','RolloutReceipt','RollbackReceipt','ChronicleEntry'],
    safety: { publicSurfaceExternalActions: 0, publicSurfaceWalletConnections: 0, expertConsoleSeparated: true, humanReviewRequired: true },
    terminalDisposition: 'HUMAN_REVIEW_REQUIRED'
  };
}
export function runLocalEconomyCycle(seed = 'goalos-agijobmanager-ascension') {
  const gates = SOVEREIGN_LOOP.map((gate, index) => ({ gate, status: index < 9 ? 'sealed' : 'rollback-ready', evidence: `${seed}:${gate}:${index}` }));
  return { id: `SME-${seed.length}-${gates.length}`, gates, terminalDisposition: 'HUMAN_REVIEW_REQUIRED', externalActions: 0 };
}
