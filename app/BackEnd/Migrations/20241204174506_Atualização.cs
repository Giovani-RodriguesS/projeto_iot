using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class Atualização : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Tempo",
                table: "LeituraSensor",
                newName: "Hora");

            migrationBuilder.RenameColumn(
                name: "Tempo",
                table: "LeituraBomba",
                newName: "Hora");

            migrationBuilder.AddColumn<DateOnly>(
                name: "Data",
                table: "LeituraSensor",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<DateOnly>(
                name: "Data",
                table: "LeituraBomba",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Data",
                table: "LeituraSensor");

            migrationBuilder.DropColumn(
                name: "Data",
                table: "LeituraBomba");

            migrationBuilder.RenameColumn(
                name: "Hora",
                table: "LeituraSensor",
                newName: "Tempo");

            migrationBuilder.RenameColumn(
                name: "Hora",
                table: "LeituraBomba",
                newName: "Tempo");
        }
    }
}
