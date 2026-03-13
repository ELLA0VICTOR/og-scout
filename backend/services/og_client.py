import opengradient as og
import os
from dotenv import load_dotenv

load_dotenv()

_client = None


def get_og_client() -> og.Client:
    global _client
    if _client is None:
        private_key = os.environ.get("OG_PRIVATE_KEY")
        if not private_key:
            raise RuntimeError("OG_PRIVATE_KEY environment variable not set")
        llm_server_url = os.environ.get("OG_LLM_SERVER_URL", "https://llm.opengradient.ai")
        llm_streaming_server_url = os.environ.get("OG_LLM_STREAMING_SERVER_URL", llm_server_url)
        _client = og.init(
            private_key=private_key,
            og_llm_server_url=llm_server_url,
            og_llm_streaming_server_url=llm_streaming_server_url,
        )
        # Ensure Permit2 approval for OPG spending — idempotent, safe to call every startup
        _client.llm.ensure_opg_approval(opg_amount=10.0)
    return _client
