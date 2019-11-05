using System;
using System.Collections.Generic;
using System.Linq;
using similar_web;

public class PlaylistServiceMock : IPlaylistService
{
    private readonly List<Video> _playlist;

    public PlaylistServiceMock()
    {
        _playlist = new List<Video>()
            {
                new Video() { Name ="name", Id= "1293b7a4-7a37-44fd-a5d1-7ed983d00fa1", YouTubeId = "762loAfZBTA",
                    Url="https://www.youtube.com/watch?v=762loAfZBTA", Duration= 360},
                new Video() { Name ="gray", Id="3ca7ec98-221e-499f-b332-e63fe56717b7", YouTubeId = "DV55unut3oI",
                    Url="https://www.youtube.com/watch?v=DV55unut3oI", Duration= 360},
                new Video() { Name ="madrid", Id="3f7b1b0d-71db-4c17-b79c-1fc48381ee48", YouTubeId = "7vslbIlxEdY",
                    Url="https://www.youtube.com/watch?v=7vslbIlxEdY", Duration= 360},
            };
    }

    public List<Video> getVideoList()
    {
        return _playlist;
    }

    public void AddVideo(Video newItem)
    {
        newItem.Id = "asdfadsfdasf";
        _playlist.Add(newItem);
    }

    public Video RemoveVideoById(string Id)
    {
        var existing = _playlist.SingleOrDefault(ved => Id == ved.Id);
        if (existing != null)
        {
            _playlist.Remove(existing);
        }
        return existing;
    }
}