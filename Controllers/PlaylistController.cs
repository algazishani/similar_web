using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace similar_web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaylistController : ControllerBase
    {
        private readonly IPlaylistService _playlist;
        public PlaylistController(IPlaylistService playlist)
        {
            _playlist = playlist;
            //Assuming existing of a logger - _logger
        }

        [HttpGet]
        public ActionResult<List<Video>> Get()
        {
            var list = _playlist.getVideoList();
            return Ok(list);
        }

        [HttpPost]
        public IActionResult Post(Video video)
        {
            if (video is null)
            {
                //    _logger.LogError("video object sent from client is null");
                return BadRequest("video object is null");
            }

            _playlist.AddVideo(video);
            return new OkResult();
        }

        [HttpDelete]
        public IActionResult Delete(Video video)
        {
            if (video is null)
            {
                //    _logger.LogError("video object sent from client is null");
                return BadRequest("video object is null");
            }
            var removedItem = _playlist.RemoveVideoById(video.Id);
            if (removedItem == null)
            {
                //    _logger.LogError("The request video was not found", video);
                return NotFound();
            }
            return new OkResult();
        }
    }
}
