using Microsoft.EntityFrameworkCore.Migrations;

namespace Carcare.DataAccess.Migrations
{
    public partial class AddAvalableToService : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Available",
                table: "Service",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Available",
                table: "Service");
        }
    }
}
