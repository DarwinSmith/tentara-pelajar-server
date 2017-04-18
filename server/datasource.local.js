{
  PostgresConnection: {
    host: process.env.RDS_DBHOST || "localhost",
    port: 5432,
    url: process.env.RDS_URL || "postgres://postgres:postgres@localhost/tentara_pelajar",
    database: process.env.RDS_DB || "tentara_pelajar",
    password: process.env.RDS_DBPASSWORD || "postgres",
    name: "PostgresConnection",
    user: process.env.RDS_DBUSER || "postgres",
    connector: "postgresql"
  }
}
