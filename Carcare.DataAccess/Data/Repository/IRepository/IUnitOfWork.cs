using System;
using System.Collections.Generic;
using System.Text;

namespace Carcare.DataAccess.Data.Repository.IRepository
{
    public interface IUnitOfWork :IDisposable
    {
        ICategoryRepository Category { get; }
        IFrequencyRepository Frequency { get; }
        IServiceRepository Service { get; }
        IOrderHeaderRepository OrderHeader { get; }
        IOrderDetailsRepository OrderDetails { get; }

        void Save();
    }
}
