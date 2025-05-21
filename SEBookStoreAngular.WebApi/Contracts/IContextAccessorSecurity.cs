//@BaseCode
#if ACCOUNT_ON
namespace SEBookStoreAngular.WebApi.Contracts
{
    partial interface IContextAccessor
    {
        string SessionToken { set; }
    }
}
#endif
