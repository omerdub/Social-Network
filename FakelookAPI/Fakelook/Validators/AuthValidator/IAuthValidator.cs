using System.Collections.Generic;

namespace FakelookAPI.Validators.AuthValidator
{
    public interface IAuthValidator<T>
    {
        List<string> Validate(T entity);
    }
}
