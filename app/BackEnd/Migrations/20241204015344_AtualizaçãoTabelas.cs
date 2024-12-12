using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class AtualizaçãoTabelas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumPino",
                table: "Sensor",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Tipo",
                table: "Sensor",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "IdSensor",
                table: "LeituraSensor",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdBomba",
                table: "LeituraBomba",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Localizacao",
                table: "Bomba",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<int>(
                name: "NumPino",
                table: "Bomba",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumPino",
                table: "Sensor");

            migrationBuilder.DropColumn(
                name: "Tipo",
                table: "Sensor");

            migrationBuilder.DropColumn(
                name: "IdSensor",
                table: "LeituraSensor");

            migrationBuilder.DropColumn(
                name: "IdBomba",
                table: "LeituraBomba");

            migrationBuilder.DropColumn(
                name: "NumPino",
                table: "Bomba");

            migrationBuilder.AlterColumn<string>(
                name: "Localizacao",
                table: "Bomba",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);
        }
    }
}
