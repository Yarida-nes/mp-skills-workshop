import socket
import uuid

import pytest
from fastapi.testclient import TestClient

from config import settings
from db.seed import DEMO_EMAIL, DEMO_PASSWORD

LOOPBACK_HOSTS = {"127.0.0.1", "::1", "localhost"}


@pytest.fixture(autouse=True)
def no_network(monkeypatch):
    """Fail any test that tries to open an outbound connection.

    Loopback stays open: on Windows asyncio builds its event loop from a
    socketpair connected over 127.0.0.1.
    """
    real_create_connection = socket.create_connection
    real_connect = socket.socket.connect

    def is_loopback(address):
        return isinstance(address, tuple) and address[0] in LOOPBACK_HOSTS

    def guarded_create_connection(address, *args, **kwargs):
        if not is_loopback(address):
            raise RuntimeError("Tests must not make network calls")
        return real_create_connection(address, *args, **kwargs)

    def guarded_connect(sock, address):
        if not is_loopback(address):
            raise RuntimeError("Tests must not make network calls")
        return real_connect(sock, address)

    monkeypatch.setattr(socket, "create_connection", guarded_create_connection)
    monkeypatch.setattr(socket.socket, "connect", guarded_connect)


@pytest.fixture
def client(tmp_path, monkeypatch):
    """The API running in-process against a throwaway database."""
    monkeypatch.setattr(settings, "database_path", str(tmp_path / "test.db"))
    from main import app

    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture
def anon_headers():
    return {"X-Basket-Id": str(uuid.uuid4())}


def login(client, email=DEMO_EMAIL, password=DEMO_PASSWORD, headers=None):
    response = client.post(
        "/api/auth/login",
        json={"email": email, "password": password},
        headers=headers or {},
    )
    assert response.status_code == 200, response.text
    return {"Authorization": f"Bearer {response.json()['access_token']}"}


@pytest.fixture
def demo_headers(client):
    return login(client)
