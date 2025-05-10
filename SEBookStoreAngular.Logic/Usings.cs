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
global using CommonEnums = SEBookStoreAngular.Common.Enums;
global using CommonContracts = SEBookStoreAngular.Common.Contracts;
global using CommonModels = SEBookStoreAngular.Common.Models;
global using CommonModules = SEBookStoreAngular.Common.Modules;
global using SEBookStoreAngular.Common.Extensions;
global using System.ComponentModel.DataAnnotations;
global using System.ComponentModel.DataAnnotations.Schema;
global using Microsoft.EntityFrameworkCore;

