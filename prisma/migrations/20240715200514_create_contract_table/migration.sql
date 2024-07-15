-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employeeId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "interrupmentDate" DATETIME,
    "role" TEXT NOT NULL,
    "contractUrl" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'cpf',
    "sallary" REAL NOT NULL,
    "hours" REAL NOT NULL,
    "hoursType" TEXT NOT NULL DEFAULT 'monthly',
    "description" TEXT,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Contract_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
