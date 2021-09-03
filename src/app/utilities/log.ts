import { LOG } from '../Interface/log';
import { LogService } from '../service/log.service';

export const create_log = async (data: LOG, log_service: LogService) => {
  await log_service.create_log(data);
};
