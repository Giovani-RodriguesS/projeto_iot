public abstract class Dispositivo
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public string Tipo { get; set; }
    public int NumPino { get; set; }
    public DateOnly Data_instalacao { get; set; }
}