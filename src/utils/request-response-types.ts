import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Request, Response } from 'express';

export type NestRequest = Request | FastifyRequest;
export type NestResponse = Response | FastifyReply;
