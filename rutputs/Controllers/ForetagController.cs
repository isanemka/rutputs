using Microsoft.AspNetCore.Mvc;

namespace rutputs.Controllers
{
    public class ForetagController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
