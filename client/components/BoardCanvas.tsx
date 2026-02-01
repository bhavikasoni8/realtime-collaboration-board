"use client";

import { Stage, Layer, Rect, Text, Group } from "react-konva";
import { useBoardStore } from "@/store/boardStore";
import { socket } from "@/socket";
import { BoardOperation } from "@/types/board";

export default function BoardCanvas({ roomId }: { roomId: string }) {
  const { elements, applyOp } = useBoardStore();

  return (
    <Stage width={window.innerWidth} height={600}>
      <Layer>
        {elements.map((el) => (
          <Group
            key={el.id}
            x={el.x}
            y={el.y}
            draggable
            onDragEnd={(e) => {
              const op: BoardOperation = {
                id: crypto.randomUUID(),
                type: "MOVE",
                payload: {
                  id: el.id,
                  x: e.target.x(),
                  y: e.target.y(),
                },
              };

              socket.emit("board-op", { roomId, operation: op });
              applyOp(op);
            }}
          >
            <Rect
              width={140}
              height={80}
              fill="#fff59d"
              cornerRadius={8}
              shadowBlur={4}
            />
            <Text text={el.text || ""} width={140} padding={10} fontSize={14} />
          </Group>
        ))}
      </Layer>
    </Stage>
  );
}
