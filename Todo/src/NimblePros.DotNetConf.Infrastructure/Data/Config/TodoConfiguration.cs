using Todo.Core.ProjectAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Todo.Infrastructure.Data.Config;

public class TodoConfiguration : IEntityTypeConfiguration<TodoItem>
{
  public void Configure(EntityTypeBuilder<TodoItem> builder)
  {
    builder.Property(p => p.Title)
        .HasMaxLength(100)
        .IsRequired();
    builder.Property(p => p.Desc);
    builder.Property(p => p.Status)
       .IsRequired();
  }
}
