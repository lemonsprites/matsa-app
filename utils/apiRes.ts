import { NextResponse } from "next/server";

export function apiRes<T>(
  success: boolean,
  data: T | null,
  error: { code: string; message: string } | null,
  status: number
) {
  return NextResponse.json(
    {
      success,
      data,
      error,
      status,
    },
    { status }
  );
}

export function apiPostRes<T>(
  data: T | null,
  error: { code: string; message: string } | null,
  status: number
) {
  return NextResponse.json(
    {
      success: !error,
      data,
      error,
      status,
    },
    { status }
  );
}
