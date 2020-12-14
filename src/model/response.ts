export class HttpResponseDTO {
  data: any | undefined | null;
  error: string | undefined | null;

  constructor(data: any | undefined | null, error: string | undefined | null) {
    this.data = data;
    this.error = error;
  }
}