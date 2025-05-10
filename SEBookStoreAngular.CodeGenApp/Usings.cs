//@CodeCopy
#if IDINT_ON
global using IdType = System.Int32;
#elif IDLONG_ON
    global using IdType = System.Int64;
#elif IDGUID_ON
    global using IdType = System.Guid;
#else
global using IdType = System.Int32;
#endif
global using Common = SEBookStoreAngular.Common;
global using CommonModules = SEBookStoreAngular.Common.Modules;
global using SEBookStoreAngular.Common.Extensions;
global using CommonStaticLiterals = SEBookStoreAngular.Common.StaticLiterals;
global using TemplatePath = SEBookStoreAngular.Common.Modules.Template.TemplatePath;
