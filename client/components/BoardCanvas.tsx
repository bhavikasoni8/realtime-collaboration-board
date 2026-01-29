"use client";

import { Stage, Layer, Rect, Text, Group } from "react-konva";
import { useBoardStore } from "@/store/boardStore";
import { socket } from "@/socket";

type Props = {
  roomId: string;
};

export default function BoardCanvas({ roomId }: Props) {
  const { elements, applyOp } = useBoardStore();
  console.log("elements: ", elements);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight - 80}>
      <Layer>
        {elements.map((el) => (
          <Group
            key={el.id}
            x={el.x}
            y={el.y}
            draggable
            onDragEnd={(e) => {
              const op = {
                id: crypto.randomUUID(),
                type: "MOVE" as const,
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
