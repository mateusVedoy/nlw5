import { Repository, EntityRepository } from "typeorm";

//importando entidade Setting
import { Setting } from "../entities/Setting";

//indica que a classe abaixo é repositorio da entidade Setting
@EntityRepository(Setting)

//classe estendida de Repository do tipo Setting
class SettingsRepository extends Repository<Setting>{}

//exporta a classe 
export { SettingsRepository };