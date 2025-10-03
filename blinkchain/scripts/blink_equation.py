import time
import json
from datetime import datetime

GENESIS_TIMESTAMP = 1696200000  # Replace with your actual genesis time (Unix)
INTERVAL_SECONDS = 86400        # 1 pulse per day

def should_emit_pulse():
    now = int(time.time())
    pulse = (now - GENESIS_TIMESTAMP) // INTERVAL_SECONDS
    return pulse

def emit_manifest(pulse):
    manifest = {
        "pulse": pulse,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "manifest_cid": "pending",
        "sigil_hex": "pending",
        "entropy_hash": "pending",
        "raw_tx": "pending"
    }
    with open(f"ipfs_index/pulse_{pulse}.json", "w") as f:
        json.dump(manifest, f, indent=2)

if __name__ == "__main__":
    pulse = should_emit_pulse()
    emit_manifest(pulse)
