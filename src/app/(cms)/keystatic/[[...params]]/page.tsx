import { makePage } from '@keystatic/next/ui/app';
import config from '../../../../../keystatic.config';

export default makePage(config);

export function generateStaticParams() {
  return [{ params: ['keystatic'] }];
}
