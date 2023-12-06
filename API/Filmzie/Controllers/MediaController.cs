using Filmzie.ApiService;
using Filmzie.ApiService.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Filmzie.Controllers
{
    [Route("api/")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly IOMDBService _omdbService;

        public MediaController(IOMDBService service)
        {
            _omdbService = service;
        }


        [HttpGet("detail/{mediaId}")]
        public async Task<IActionResult> GetMediaDetails(string mediaId)
        {
            try
            {
                HttpResponseMessage response = await _omdbService.MediaByIdAsync(mediaId);

                if (response.IsSuccessStatusCode)
                {
                    var mediaDetails = await response.Content.ReadAsStringAsync();

                    return Ok(mediaDetails);
                }
                else
                {
                    return StatusCode((int)response.StatusCode, response.ReasonPhrase);
                }
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, $"Error: {ex.Message}");
            }
        }


        [HttpGet("search/{Title}")]
        public async Task<IActionResult> SearchMediaByYear(string Title, string? year)
        {
            try
            {
                HttpResponseMessage response = await _omdbService.MediaByTitleAsync(Title, year);

                if (response.IsSuccessStatusCode)
                {
                    var mediaDetails = await response.Content.ReadAsStringAsync();

                    return Ok(mediaDetails);
                }
                else
                {
                    return StatusCode((int)response.StatusCode, response.ReasonPhrase);
                }
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, $"Error: {ex.Message}");
            }
        }




        [HttpGet("/search/{query}/{page}")]
        public async Task<IActionResult> SearchMedia(string query, int page)
        {
            try
            {
                HttpResponseMessage response = await _omdbService.MediaSearchAsync(query, page);

                if (response.IsSuccessStatusCode)
                {
                    var mediaSearchResults = await response.Content.ReadAsStringAsync();
                    return Ok(mediaSearchResults);
                }
                else
                {
                    return StatusCode((int)response.StatusCode, response.ReasonPhrase);
                }
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, $"Error: {ex.Message}");
            }
        }
    }
}
