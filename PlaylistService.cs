using System.Collections.Generic;
using System.Linq;
namespace similar_web
{
    public class PlaylistService : IPlaylistService
    {
        private List<Video> _playlist = new List<Video>();

        public void AddVideo(Video v)
        {
            if (v != null)
            {
                Video video = new Video
                {
                    Duration = v.Duration,
                    Name = v.Name,
                    Url = v.Url,
                    Id = v.Id,
                    YouTubeId = v.YouTubeId
                };
                this._playlist.Add(video);
            }
        }

        public List<Video> getVideoList()
        {
            return this._playlist;
        }

        public Video RemoveVideoById(string Id)
        {
            var item = this._playlist.Find(ved => ved.Id == Id);
            if (item != null)
            {
                this._playlist.Remove(item);
            }
            return item;
        }
    }
}