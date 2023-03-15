using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogPost.Models;
using Microsoft.AspNetCore.Authorization;

namespace BlogPost.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly BlogContext _context;

        public BlogsController(BlogContext context)
        {
            _context = context;
        }

        // GET: api/Blogs
        [AllowAnonymous]
        [HttpGet]
        public IQueryable<Object> GetBlogs()
        {
            //return await _context.Blogs.ToListAsync();
            return from b in _context.Blogs
                   join u in _context.Users on b.UserId equals u.Id
                   select new
                   {
                       id = b.Id,
                       title = b.Title,
                       content = b.Content,
                       name = u.UserName
                   };
            
        }

        // GET: api/Blogs/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Blog>> GetBlog(long id)
        {
            var blog = await _context.Blogs.FindAsync(id);

            if (blog == null)
            {
                return NotFound();
            }

            return blog;
        }

        // get blog by user id
        [AllowAnonymous]
        [HttpGet("/blog/{id}")]
        public async Task<ActionResult<IEnumerable<Blog>>> GetBlogsById(long id)
        {
            return await _context.Blogs.Where(x => x.UserId == id).ToListAsync();

        }

        // PUT: api/Blogs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlog(long id, Blog blog)
        {
            Console.WriteLine("PUT");
            if (id != blog.Id)
            {
                Console.WriteLine(id);
                return BadRequest();
            }

            _context.Entry(blog).State = EntityState.Modified;

            try
            {
                Console.WriteLine("try");
                await _context.SaveChangesAsync();
                Console.WriteLine("Updated");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Blogs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Blog>> PostBlog(Blog blog)
        {
            _context.Blogs.Add(blog);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBlog", new { id = blog.Id }, blog);
        }

        // DELETE: api/Blogs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(long id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }

            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlogExists(long id)
        {
            return _context.Blogs.Any(e => e.Id == id);
        }
    }
}
