// @ts-check

/**
 * Implement the classes etc. that are needed to solve the
 * exercise in this file. Do not forget to export the entities
 * you defined so they are available for the tests.
 */
export function Size(width, height) {
  this.width = width ?? 80;
  this.height = height ?? 60;
}

Size.prototype.resize = function (width, height) {
  this.width = width;
  this.height = height;
};

export function Position(x, y) {
  this.x = x ?? 0;
  this.y = y ?? 0;
}

Position.prototype.move = function (x, y) {
  this.x = x;
  this.y = y;
};

export class ProgramWindow {
  constructor() {
    this.screenSize = new Size(800, 600);
    this.size = new Size();
    this.position = new Position();
  }

  resize(newSize) {
    const maxWidth = this.screenSize.width - this.position.x;
    const maxHeight = this.screenSize.height - this.position.y;

    const width = Math.min(Math.max(newSize.width, 1), maxWidth);
    const height = Math.min(Math.max(newSize.height, 1), maxHeight);

    this.size.resize(width, height);
  }

  move(newPosition) {
    const x = Math.min(
      Math.max(newPosition.x, 0),
      this.screenSize.width - this.size.width,
    );
    const y = Math.min(
      Math.max(newPosition.y, 0),
      this.screenSize.height - this.size.height,
    );
    this.position.move(x, y);
  }
}

export function changeWindow(programWindow) {
  programWindow.resize(new Size(400, 300));
  programWindow.move(new Position(100, 150));
  return programWindow;
}
