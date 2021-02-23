import date from "date-and-time";


export const formatData = (data:Array<object>) => {
  return data.map((taxInfo: any) => {
        const newDate = date.format(taxInfo.createdat, "DD/MM/YY HH:mm");
        return { ...taxInfo , newDate};
      });
}