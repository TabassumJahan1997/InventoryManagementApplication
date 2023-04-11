using InventoryDatabaseModel.Context;
using InventoryRepositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryRepositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        InventoryDbContext db;
        public UnitOfWork(InventoryDbContext db)
        {
            this.db = db;
        }
        public async Task CompleteAsync()
        {
            await db.SaveChangesAsync();
        }

        public void Dispose()
        {
            this.db.Dispose();
        }

        public IGenericRepo<T> GetRepo<T>() where T : class, new()
        {
            return new GenericRepo<T>(this.db);
        }
    }
}
