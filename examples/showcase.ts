// A small command registry, like the one behind the Command Palette.

type Scope = "editor" | "terminal";

interface Command {
  id: string;
  title: string;
  scope: Scope;
  run(...args: unknown[]): Promise<void>;
}

const MAX_RECENT = 5;

export class CommandRegistry {
  private readonly commands = new Map<string, Command>();
  private recent: string[] = [];

  register(command: Command): this {
    if (this.commands.has(command.id)) {
      throw new Error(`Command already registered: ${command.id}`);
    }
    this.commands.set(command.id, command);
    return this;
  }

  async execute(id: string, ...args: unknown[]): Promise<void> {
    const command = this.commands.get(id);
    if (!command) throw new RangeError(`Unknown command: ${id}`);
    this.recent = [id, ...this.recent.filter((r) => r !== id)].slice(0, MAX_RECENT);
    await command.run(...args);
  }
}

export const label = ({ title, scope }: Command): string =>
  scope === "terminal" ? `Terminal: ${title}` : title;
