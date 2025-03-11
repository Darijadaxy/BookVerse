using DomainModel;

public class Citanje
{
    public required Korisnik korisnik { get; set; }

    public required Knjiga knjiga { get; set; }

    public required String status { get; set; } 
    public int trenutnaStrana { get; set; } 

}