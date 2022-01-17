using Todo.Core.ProjectAggregate;
using Todo.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Todo.Web;

public static class SeedData
{
  public static readonly TodoItem TestProject1 = new TodoItem(
    "Ceci est un test", "Interventionnelle, mieux vaut décloisonner les process framework.", true
    );

  public static void Initialize(IServiceProvider serviceProvider)
  {
    using (var dbContext = new AppDbContext(
        serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>(), null))
    {
      // Look for any TODO items.
      if (dbContext.Todo.Any())
      {
        return;   // DB has been seeded
      }

      PopulateTestData(dbContext);


    }
  }
  public static void PopulateTestData(AppDbContext dbContext)
  {
    foreach (var item in dbContext.Todo)
    {
      dbContext.Remove(item);
    }
    dbContext.SaveChanges();

    TestProject1.Id = 1;
    dbContext.Todo.Add(TestProject1);

    dbContext.SaveChanges();
  }
}
