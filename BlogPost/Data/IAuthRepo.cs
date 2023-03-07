using BlogPost.Models;

namespace BlogPost.Data
{
    public interface IAuthRepo
    {
        Task<int> Register(User user , string password);
        Task<string> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}
