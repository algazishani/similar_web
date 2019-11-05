using similar_web.Controllers;
using Xunit;
using similar_web.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;

namespace similar_web
{
    public class PlaylistControllerTest
    {
        PlaylistController _controller;
        IPlaylistService _service;

        public PlaylistControllerTest()
        {
            _service = new PlaylistServiceMock();
            _controller = new PlaylistController(_service);
        }


        [Fact]
        public void Get_WhenCalled_ReturnsOkResult()
        {
            // Act
            var okResult = _controller.Get();

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public void Get_WhenCalled_ReturnsAllItems()
        {
            // Act
            var okResult = _controller.Get().Result as OkObjectResult;

            // Assert
            var items = Assert.IsType<List<Video>>(okResult.Value);
            Assert.Equal(3, items.Count);
        }

        [Fact]
        public void Post_WhenCalled_ReturnsOk()
        {
            //Arrange
            var newVideo = new Video()
            {
                Duration = 1244,
                YouTubeId = "gsXsTpCSvn0",
                Id = "f5bdf2be-8283-43d7-a1d0-925d7d447e99",
                Name = "newVideo",
                Url = "https://www.youtube.com/watch?v=gsXsTpCSvn0&list=RDZGExuf-y1F0&index=27"
            };
            Assert.Equal(3, _service.getVideoList().Count);

            // Act
            _controller.Post(newVideo);

            // Assert
            Assert.Equal(4, _service.getVideoList().Count);
        }


        [Fact]
        public void Post_WhenCalled_nullObject()
        {
            // Act
            var badResponse = _controller.Post(null);

            // Assert
            Assert.IsType<BadRequestObjectResult>(badResponse);
        }

        [Fact]
        public void Delete_WhenCalled_nullObject()
        {
            // Act
            var badResponse = _controller.Delete(null);

            // Assert
            Assert.IsType<BadRequestObjectResult>(badResponse);
        }

        [Fact]
        public void Delete_WhenCalled_notFound()
        {
            //Arrange
            Video newVideo = new Video()
            {
                Duration = 1244,
                YouTubeId = "gsXsTpCSvn0",
                Id = "f5bdf2be-8283-43d7-a1d0-925d7d447e99",
                Name = "newVideo",
                Url = "https://www.youtube.com/watch?v=gsXsTpCSvn0&list=RDZGExuf-y1F0&index=27"
            };
            // Act
            var notFound = _controller.Delete(newVideo);

            // Assert
            Assert.IsType<NotFoundResult>(notFound);
        }

        [Fact]
        public void Delete_WhenCalled_Ok()
        {
            //Arrange
            var newVideo = new Video()
            {
                Name = "madrid",
                Id = "3f7b1b0d-71db-4c17-b79c-1fc48381ee48",
                YouTubeId = "7vslbIlxEdY",
                Url = "https://www.youtube.com/watch?v=7vslbIlxEdY",
                Duration = 360
            };

            // Act
            var okResponse = _controller.Delete(newVideo);

            // Assert
            Assert.IsType<OkResult>(okResponse);
            Assert.Equal(2, _service.getVideoList().Count);
        }
    }
}