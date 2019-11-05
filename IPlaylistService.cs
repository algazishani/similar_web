using System.Collections.Generic;
using similar_web;

public interface IPlaylistService
{
    List<Video> getVideoList();
    void AddVideo(Video v);
    Video RemoveVideoById(string id);
}