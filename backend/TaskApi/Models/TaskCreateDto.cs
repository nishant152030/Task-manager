using System.ComponentModel.DataAnnotations;

namespace TaskApi.Models
{
    public class TaskCreateDto
    {
        [Required, MinLength(1)]
        public string Description { get; set; } = string.Empty;
    }
}
