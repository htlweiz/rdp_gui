import type { UrlParams } from '@/types/url-paras.type'

export abstract class Command {
  public constructor(protected params: UrlParams) {}
  public abstract execute(arg: string): void
}
