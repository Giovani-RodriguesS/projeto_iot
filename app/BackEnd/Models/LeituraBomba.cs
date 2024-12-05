public class LeituraBomba : Leitura
{
    public DateOnly Data { get; set; }
    public TimeOnly Hora { get; set; }
    public int IdBomba { get; set; }
    public bool BombaAtivada { get; set; }
}