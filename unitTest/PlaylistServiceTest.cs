using similar_web.Controllers;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;

namespace similar_web.unitTest
{
    public class PlaylistServiceTest
    {
        PlaylistService _service;

        public PlaylistServiceTest()
        {
            _service = new PlaylistService();
        }


        [Fact]
        public void AddVideo_WhenCalled_Null()
        {
            Assert.Equal(0, _service.getVideoList().Count);

            // Act
            _service.AddVideo(null);

            // Assert
            Assert.Equal(0, _service.getVideoList().Count);

        }

        [Fact]
        public void AddVideo_WhenCalled_newVideo()
        {
            Assert.Equal(0, _service.getVideoList().Count);

            Video newVideo = new Video()
            {
                Name = "name",
                Id = "1293b7a4-7a37-44fd-a5d1-7ed983d00fa1",
                YouTubeId = "762loAfZBTA",
                Url = "https://www.youtube.com/watch?v=762loAfZBTA",
                Duration = 360
            };

            // Act
            _service.AddVideo(newVideo);

            // Assert
            Assert.Equal(1, _service.getVideoList().Count);

        }

        [Fact]
        public void RemoveVideo_WhenCalled_notExisting()
        {
            //Arrange
            var newVideo = new Video()
            {
                Duration = 1224,
                YouTubeId = "fsXsTpCSvn0",
                Id = "f5bdf2be-8283-43d7-a1d0-925d7d447e99",
                Name = "newVideo",
                Url = "https://www.youtube.com/watch?v=gsXsTpCSvn0&list=RDZGExuf-y1F0&index=27"
            };
            // Act
            var removed = _service.RemoveVideoById(null);

            // Assert
            Assert.Null(removed);
        }


        [Fact]
        public void RemoveVideo_WhenCalled_ExistingObject()
        {
            var newVideo = new Video()
            {
                Duration = 1244,
                YouTubeId = "gsXsTpCSvn0",
                Id = "f5bdf2be-8283-43d7-a1d0-925d7d447e99",
                Name = "newVideo",
                Url = "https://www.youtube.com/watch?v=gsXsTpCSvn0&list=RDZGExuf-y1F0&index=27"
            };
            // Act
            _service.AddVideo(newVideo);
            var removed = _service.RemoveVideoById(newVideo.Id);

            // Assert
            Assert.Equal(newVideo.Id, removed.Id);
            Assert.Equal(0, _service.getVideoList().Count);
        }
    }
}