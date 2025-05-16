from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import os

# Lecture des variables d'environnement (à configurer)
CASSANDRA_HOST = os.getenv("CASSANDRA_CONTACT_POINTS", "127.0.0.1")
CASSANDRA_PORT = int(os.getenv("CASSANDRA_PORT", 9042))
CASSANDRA_KEYSPACE = os.getenv("CASSANDRA_KEYSPACE", "edu_platform")
CASSANDRA_USERNAME = os.getenv("CASSANDRA_USERNAME", "cassandra")
CASSANDRA_PASSWORD = os.getenv("CASSANDRA_PASSWORD", "cassandra")

def get_cassandra_session():
    auth_provider = PlainTextAuthProvider(username=CASSANDRA_USERNAME, password=CASSANDRA_PASSWORD)
    cluster = Cluster([CASSANDRA_HOST], port=CASSANDRA_PORT, auth_provider=auth_provider)
    session = cluster.connect()
    session.set_keyspace(CASSANDRA_KEYSPACE)
    return session

session = get_cassandra_session()
