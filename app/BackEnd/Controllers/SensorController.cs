using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd.Data;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SensorController : ControllerBase
    {
        private readonly BackEndContext _context;

        public SensorController(BackEndContext context)
        {
            _context = context;
        }

        // GET: api/Sensor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sensor>>> GetSensor()
        {
            return await _context.Sensor.ToListAsync();
        }

        // GET: api/Sensor/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sensor>> GetSensor(int id)
        {
            var sensor = await _context.Sensor.FindAsync(id);

            if (sensor == null)
            {
                return NotFound();
            }

            return sensor;
        }

        // PUT: api/Sensor/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSensor(int id, SensorDTO sensorDTO)
        {
            // Buscar o sensor existente no banco de dados
            var sensor = await _context.Sensor.FindAsync(id);
            if (sensor == null)
            {
                return NotFound(); // Retorna 404 se o sensor não for encontrado
            }
        
            // Verificar se o ID fornecido corresponde ao esperado
            if (id != sensor.Id)
            {
                return BadRequest(); // Retorna 400 se os IDs não corresponderem
            }
        
            // Atualizar os campos do sensor com os valores do DTO
            sensor.Nome = sensorDTO.Nome;
            sensor.Umidade = sensorDTO.Umidade;
            sensor.NumPino = sensorDTO.NumPino;
            sensor.Tipo = sensorDTO.Tipo;
            sensor.Data_instalacao = sensorDTO.Data_instalacao;
        
            // Marcar a entidade como modificada
            _context.Entry(sensor).State = EntityState.Modified;
        
            try
            {
                // Persistir as alterações no banco de dados
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SensorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        
            // Retornar status 204 No Content para indicar sucesso
            return NoContent();
        }



        // POST: api/Sensor
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sensor>> PostSensor(SensorDTO sensorDTO)
        {
            if (sensorDTO == null)
            {
                return BadRequest("Dados inválidos.");
            }
        
            // Cria um novo objeto Sensor com as propriedades do DTO
            var sensor = new Sensor
            {
                Nome = sensorDTO.Nome,
                Umidade = sensorDTO.Umidade,
                NumPino = sensorDTO.NumPino,
                Tipo = sensorDTO.Tipo,
                Data_instalacao = sensorDTO.Data_instalacao
            };
        
            // Adiciona o novo sensor ao contexto
            _context.Sensor.Add(sensor);
        
            // Salva as alterações no banco de dados (isso vai gerar o Id automaticamente)
            await _context.SaveChangesAsync();
        
            // Retorna uma resposta de sucesso com o novo sensor e o caminho para consulta
            return CreatedAtAction("GetSensor", new { id = sensor.Id }, sensor);
        }


        

        // DELETE: api/Sensor/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSensor(int id)
        {
            var sensor = await _context.Sensor.FindAsync(id);
            if (sensor == null)
            {
                return NotFound();
            }

            _context.Sensor.Remove(sensor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SensorExists(int id)
        {
            return _context.Sensor.Any(e => e.Id == id);
        }
    }
}
